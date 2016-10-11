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
            // Master - cards that haven't been discarded
            master: Array.prototype.slice.call(cards, 0),
            // Active - cards displayed on screen
            active: Array.prototype.slice.call(cards, 0),
            // Discards - cards that have been discarded
            discards: [],
            // Liked - cards that have been liked
            liked: [],
            // Disliked - cards that have disliked
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

        // Adds a card to cards.active
        $scope.addCard = function () {

            var newCard = cardTypes[0];

            updateCurrentEventInfo(newCard);

            $scope.cards.active.push(angular.extend({}, newCard));

        };

        // Triggers a refresh of all cards that have not been discarded
        // TODO
        // Добавлять карты к имеющимся, а не затирать!!!!
        $scope.refreshCards = function (cards) {

            if (cards) {

                $scope.cards.master = cards;

                // First set $scope.cards to null so that directive reloads
                $scope.cards.active = null;

                // Then set cards.active to a new copy of cards.master
                $timeout(function() {

                    $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);

                    updateCurrentEventInfo($scope.cards.active[0]);

                });

            }

        };

        // Listens for the 'removeCard' event emitted from within the directive
        //  - triggered by the onClickTransitionOut click event
        $scope.$on('removeCard', function (event, element, card) {

            var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);

            $scope.cards.discards.push(discarded);

        });

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

    }

    /**
     * Обновление текущей информации по карточке.
     * @param infoForUpdate информация для обновления текста по карточке.
     */
    function updateCurrentEventInfo(infoForUpdate) {

        var MESSAGE_ABOUT_FREE_EVENT = 'бесплатно';

        if ($scope.cards.active) {

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

        if(!error) {

            $scope.refreshCards(cards);

            // Запускаем цикл для отлова изменения в $scope.cards.active.
            $scope.$digest();
        }

    }

    function initializeCardManager() {

        cardsManager.registerPushCardsMethod(pushCards);
        cardsManager.start();

    }

}
