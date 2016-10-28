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
    var newCards = [];

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

            // Псле удаления карты, пытаемся добавить новые карты.
            // Быть может они уже поступили от менеджера карточек.
            tryAddNewCards();

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
     * Сам принцип работы метода опирается на нюанс директивы td-cards.
     * Необходимо ее "перегружать" при каком-либо изменении в $scope.cards.active,
     * дабы все необходимые стили анимации были применены для каждой карты
     * в колоде активных.
     */
    function updateActiveCards(newCards) {

        var previousCards = $scope.cards.active || [];

        $scope.cards.active = null;

        $timeout(function () {

            // Конкатенируем карты которые имелись с новыми и перетасовываем их.
            $scope.cards.active = lodash.shuffle(lodash.concat(previousCards, newCards));

        });

    }

    /**
     * Метод проверки наличия новых карт для добавления в колоду активных.
     * Логику проверки наличия новых карт, их добавление в колоду активных и их
     * последующую очистку было решено инкапсулировать в отдельный метод.
     */
    function tryAddNewCards() {

        //Если есть новые карточки для добавления.
        if (newCards.length) {

            updateActiveCards(newCards);

            // очищаем добавленные карты.
            newCards = [];

        }
    }

    /**
     * Метод постанова на учет контроллером новой порции карточек.
     * Данный метод позволяет быть использованным в качестве коллбэка.
     * Поэтому позволяет задать первым параметром описание ошибочной ситуации.
     */
    function pushCards(error, cardsForPush) {

        if (!error) {

            newCards = lodash.concat(newCards, cardsForPush);

            // Если на данный момент в колоде активных отсутствуют карты,
            // то добавляем их сразу. В противном случае НЕ добавляем, так
            // как пользователь сейчас просматривает карту и нарушать
            // состояние $scope.cards.active пока не имеет смысла.
            if (!$scope.cards.active || !$scope.cards.active.length) {

                tryAddNewCards();

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
