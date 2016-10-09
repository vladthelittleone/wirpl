/**
 * Created by vladthelittleone on 25.09.16.
 */
WirplController.$inject = ['$scope', 'TDCardDelegate', '$timeout'];

var parser = require('./../parsers/kudago/events');
var lodash = require('lodash');

module.exports = WirplController;

/**
 * Контроллер страницы вывода пользователей и мероприятий.
 */
function WirplController($scope, TDCardDelegate, $timeout) {

  var cards = [];

  var events;

  $scope.eventTitle = "untitled";
  $scope.eventDate = "untitled";
  $scope.price = "untitiled";

  parser.getAllEvents(1, 'spb',Date.now() / 1000, function(error, result){

    events = JSON.parse(result).results;

    events.forEach(function(item) {

      var images = item.images;

      var image = lodash.sample(images).image;

      var d = new Date(item.dates[0].start * 1000);

      cards.push({image: image,
                  title: item.short_title,
                  date:  d.toLocaleString(),
                  price: item.price});

    });

    $scope.cards = {
      // Master - cards that haven't been discarded
      master:   Array.prototype.slice.call(cards, 0),
      // Active - cards displayed on screen
      active:   Array.prototype.slice.call(cards, 0),
      // Discards - cards that have been discarded
      discards: [],
      // Liked - cards that have been liked
      liked:    [],
      // Disliked - cards that have disliked
      disliked: []
    };

    // Removes a card from cards.active
    $scope.cardDestroyed = function (index) {
      $scope.cards.active.splice(index, 1);
    };

    // Adds a card to cards.active
    $scope.addCard = function () {
      var newCard = cardTypes[0];

      $scope.eventTitle = newCard.title;
      $scope.eventDate = newCard.date;
      $scope.price = newCard.price;

      $scope.cards.active.push(angular.extend({}, newCard));
    };

    // Triggers a refresh of all cards that have not been discarded
    $scope.refreshCards = function () {
      // First set $scope.cards to null so that directive reloads
      $scope.cards.active = null;
      // Then set cards.active to a new copy of cards.master
      $timeout(function () {
        $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
      });
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

      $scope.eventTitle = card.title;
      $scope.eventDate = card.date;
      $scope.price = card.price;

      $scope.cards.disliked.push(card);
    };

    // On swipe right
    $scope.cardSwipedRight = function (index) {
      var card = $scope.cards.active[index];

      $scope.eventTitle = card.title;
      $scope.eventDate = card.date;
      $scope.price = card.price;

      $scope.cards.liked.push(card);
    };

  });

}
