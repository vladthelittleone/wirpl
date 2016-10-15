/**
 * Created by vladthelittleone on 25.09.16.
 */
WirplController.$inject = ['$scope', '$timeout', 'cardsManager'];

var lodash = require('lodash');

module.exports = WirplController;

/**
 * Контроллер страницы вывода пользователей и мероприятий.
 * Контроллер получает карточки для отображения от cards.manager.
 * Основное требования контроллера для ЛЮБОЙ карты (по крайней мере,
 * для того, чтобы она должным образом отображалась пользователю) это
 * определять следующие поля:
 * - image. Url на картинку карточки;
 * - type. Тип карточки;
 * - head;
 * - title;
 * - body;
 * - additional.
 * Все перечисленные поля определяются сервисом каждого типа карточек самостоятельно.
 * Но это контроллера уже не касается :)
 */
function WirplController($scope, $timeout, cardsManager) {

    // Очередь карточек на добавление в колоду активных.
    var newCardsForActive = [];

    initializeScope();

    initializeCardManager();

	/**
     * Метод инициализации $scope необходимыми свойствами
     * и методами для корректного отображения карточек на экране.
     */
    function initializeScope() {

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
        // TODO
        // P.S. ВНИМАНИЕ.
        // Для ПОСЛЕДНЕЙ карты в колоде метод не вызывается!
        $scope.cardDestroyed = function (index) {

            $scope.cards.active.splice(index, 1);

            // Псле удаоения карты, проверяем, быть может имеются новые карты для добавления.
            checkForNewCards();

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
     * Метод вызывается для добавления новых карт в $scope.cards.active.
     * После добавления новых карт, метод случайным образом их перемешивает.
     */
    function updateActiveCards(newCards) {

        var previousCards = $scope.cards.active || [];

        $scope.cards.active = null;

        // Обращаем внимание ангуляр на $scope.cards.active.
        $scope.$digest();

        $timeout(function () {

            // Конкатенируем карты которые имелись с новыми и перетасовываем их.
            $scope.cards.active = lodash.shuffle(lodash.concat(previousCards, newCards));

        });

    }

    /**
     * Метод проверки наличия новых карт для добавления в колоду активных.
     * Метод опирается на проверку состояния переменной newCardsForActive.
     */
    function checkForNewCards() {

        //Если есть новые карточки для добавления.
        if (newCardsForActive.length) {

            updateActiveCards(newCardsForActive);

            // очищаем добавленные карты.
            newCardsForActive = [];

        }
    }

    /**
     * Метод для добавления новых карт менеджером карточек.
     */
    function pushCards(error, newCards) {

        if (!error) {

            // Если в колоде active нет карт (к примеру, приложение только запустили), то добавляем их сразу.
            // В противном случае, запоминаем новую порцию карт и сразу НЕ добавляем,
            // так как в данный момент пользователь еще просматривает карты.
            if (!$scope.cards.active || !$scope.cards.active.length) {

                updateActiveCards(newCards);

            } else {

                newCardsForActive = lodash.concat(newCardsForActive, newCards);

            }

        }

    }

	/**
     * Метод инициализации менеджера карточек с целью оповещения его
     * о нашей готовности принимать карточки для отображения.
     */
    function initializeCardManager() {

        cardsManager.registerPushCardsMethod(pushCards);
        cardsManager.start();

    }

}
