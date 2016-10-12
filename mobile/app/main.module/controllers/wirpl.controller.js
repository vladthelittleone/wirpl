/**
 * Created by vladthelittleone on 25.09.16.
 */
WirplController.$inject = ['$scope', 'TDCardDelegate', '$timeout', 'cardsManager'];

var lodash = require('lodash');

module.exports = WirplController;

/**
 * Контроллер страницы вывода пользователей и мероприятий.
 */
function WirplController($scope, TDCardDelegate, $timeout, cardsManager) {

    var newCardsForActive = [];

    initialize();

    initializeCardManager();

    resetCurrentCardInfo();

    function initialize() {

        $scope.cards = {
            // Карты, которые будут показаны на экране.
            active:   [],
            // Карты, которые лайкнул пользователь.
            liked:    [],
            // Карты, которые дизлайкнул пользователь.
            disliked: []
        };

        // Метод обработки уничтожения карты TDCards'ом из колоды cards.active.
        // В данном методе мы переходим к следующей карте, а также смотрим,
        // имеются ли новые для добавления в колоду активных.
        // P.S. ВНИМАНИЕ.
        // Для ПОСЛЕДНЕЙ карты в колоде метод не вызывается!
        $scope.cardDestroyed = function (index) {

            $scope.cards.active.splice(index, 1);

            // Если есть новые карточки для добавления в active.
            if (newCardsForActive.length) {

                // TODO
                // Ангуляр не отлавливает!.
                updateActiveCards(newCardsForActive);

            }

            var newCard = $scope.cards.active[index];

            // Если определена новая карта - обновляем событие о ней.
            if (newCard) {

                // Обновляем информацию на экране о следующем событии.
                updateCurrentCardInfo(newCard);

            }

        };

        // Срабатывает при перелистывании карты влево.
        $scope.cardSwipedLeft = function (index) {

            var card = $scope.cards.active[index];

            $scope.cards.disliked.push(card);

        };

        // Срабатывает при перелистывании карты вправо.
        $scope.cardSwipedRight = function (index) {

            var card = $scope.cards.active[index];

            $scope.cards.liked.push(card);

        };

        // Обрабатываем момент "перелистывания" карточки.
        // В данном методе нам не важно в какую сторону пользователь
        // "откинул" карточку. Важен лишь сам факт ее перелистывания.
        $scope.cardSwiped = function (index) {

            var card = $scope.cards.active[index];

            cardsManager.cardSwiped(card.type);

        };

    }

    /**
     * Обновление текущей информации по карточке.
     * @param infoForUpdate информация для обновления текста по карточке.
     */
    function updateCurrentCardInfo(infoForUpdate) {

        var MESSAGE_ABOUT_FREE_EVENT = 'бесплатно';

        if (infoForUpdate) {

            $scope.eventTitle = infoForUpdate.title;
            $scope.eventDate = infoForUpdate.date;
            $scope.price = $scope.is_free ? MESSAGE_ABOUT_FREE_EVENT :
                           infoForUpdate.price;
            $scope.city = infoForUpdate.city;


        } else {

            resetCurrentCardInfo();

        }

    }

    /**
     * Метод вызывается для добавления новых карт в $scope.cards.active.
     * После добавления новых карт, метод случайным образом их перетасовывает.
     */
    function updateActiveCards(newCards) {

        $scope.cards.active = lodash.shuffle(lodash.concat($scope.cards.active, newCards));

    }

    /**
     * Сброс информации по карточки в значение по умолчанию.
     * Это некий сигнал того, что информации для карточки нет.
     */
    function resetCurrentCardInfo() {

        $scope.eventTitle = "untitled";
        $scope.eventDate = "untitled";
        $scope.price = "untitiled";
        $scope.city = "untitled";

    }

    /**
     * Метод добавления новых карточек в wirpl.controller менеджером карточек.
     */
    function pushCards(error, newCards) {

        // TODO
        // Не забыть про перезагрузку директивы при поступлении ПЕРВЫХ карт.
        if (!error) {

            // Если в колоде active еще нет карт, то добавляем их сразу.
            // В противном случае запоминаем новую порцию карт и сразу не добавляем,
            // так как в данный момент пользователь просматривает карты.
            if (!$scope.cards.active.length) {

                initializeActiveCards(newCards);

            } else {

                newCardsForActive = lodash.concat(newCardsForActive, newCards);

            }

        }

    }

    /**
     * Метод вызывать ОБЯЗАТЕЛЬНО при появлении карт для добавления в ПУСТУЮ колоду active
     * (именно пустую. Т.е. это либо начало работы контроллера, либо пользователь пролистал
     * ВСЕ карты в колоде active).
     * Вся логика работы кода, которая представлена в данном методе, заключена
     * в особенности работы директивы tdCards.
     * Чтобы она применила стили анимации ко всем карточкам в active,
     * ее необходимо ПЕРЕЗАГРУЗИТЬ. Делается это обнулением ссылки на active
     * карты из scope.cards (см. на шаблон wirpl).
     */
    function initializeActiveCards(cards) {

        // TODO
        // Не забыть про перетасовку карт!
        
        $scope.cards.active = null;

        // Обращаем внимание ангуляр на $scope.cards.active.
        $scope.$digest();

        $timeout(function() {

            $scope.cards.active = cards;

            updateCurrentCardInfo($scope.cards.active[0]);

        });
    }

    function initializeCardManager() {

        cardsManager.registerPushCardsMethod(pushCards);
        cardsManager.start();

    }

}
