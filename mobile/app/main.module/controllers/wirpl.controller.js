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

    var cards = [];

    initialize();

    initializeCardManager();

    resetCurrentEventInfo();

    function initialize() {

        $scope.cards = {
            // Карточки, которые будут отображаться на экране (последовательно).
            active:   [],
            // Карточки, которые лайкнули.
            liked:    [],
            // Карточки, которые дизлайкнули.
            disliked: []
        };

        // Removes a card from cards.active
        $scope.cardDestroyed = function (index) {

            $scope.cards.active.splice(index, 1);

            var newCard = $scope.cards.active[index];

            if (newCard) {

                // Обновляем информацию на экране о следующем событии.
                updateCurrentEventInfo(newCard);

            }

        };

        // Triggers a refresh of all cards that have not been discarded
        // TODO
        // Добавлять карты к имеющимся, а не затирать!!!!
        $scope.refreshCards = function (cards) {

            if (cards) {

                // Then set cards.active to a new copy of cards.master
                $timeout(function () {

                    $scope.cards.active = lodash.concat($scope.cards.active, cards);

                    updateCurrentEventInfo($scope.cards.active[0]);

                });

            }

        };

        // On swipe left
        $scope.cardSwipedLeft = function (index) {

            var card = $scope.cards.active[index];

            cardsManager.cardSwiped(card.type);

            $scope.cards.disliked.push(card);

        };

        // On swipe right
        $scope.cardSwipedRight = function (index) {

            var card = $scope.cards.active[index];

            cardsManager.cardSwiped(card.type);

            $scope.cards.liked.push(card);

        };

        // Общий метод вызова при перелистывании карточки.
        // В случаях, когда нам нет необходимости различать, куда именно карточка
        // была отброшена.
        $scope.cardSwiped = function (index) {

            console.log('swiped');

            var card = $scope.cards.active[index];

            cardsManager.cardSwiped(card.type);

        }

    }


    /**
     * Обновление текущей информации по карточке.
     * @param infoForUpdate информация для обновления текста по карточке.
     */
    function updateCurrentEventInfo(infoForUpdate) {

        var MESSAGE_ABOUT_FREE_EVENT = 'бесплатно';

        if (infoForUpdate) {

            $scope.eventTitle = infoForUpdate.title;
            $scope.eventDate = infoForUpdate.date;
            $scope.price = $scope.is_free ? MESSAGE_ABOUT_FREE_EVENT :
                           infoForUpdate.price;
            $scope.city = infoForUpdate.city;


        } else {

            resetCurrentEventInfo();

        }

    }

    /**
     * Сброс информации по карточки в значение по умолчанию.
     * Это некий сигнал того, что информации для карточки нет.
     */
    function resetCurrentEventInfo() {

        $scope.eventTitle = "untitled";
        $scope.eventDate = "untitled";
        $scope.price = "untitiled";
        $scope.city = "untitled";

    }

    /**
     * Метод загрузки новых карточек.
     * Вызывается в случае старта контроллера и по мере окончания карточек.
     */
    function pushCards(error, cards) {

        if (!error) {

            addCardsAsActive(cards);

            // Запускаем цикл для отлова изменения в $scope.cards.active.
            $scope.$digest();
        }

    }

    function initializeCardManager() {

        cardsManager.registerPushCardsMethod(pushCards);
        cardsManager.start();

    }

    function addCardsAsActive(cards) {

        $scope.cards.active = lodash.concat($scope.cards.active, cards);

    }

}
