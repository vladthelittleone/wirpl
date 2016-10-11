/**
 * Created by vladthelittleone on 25.09.16.
 */
WirplController.$inject = ['$scope', 'TDCardDelegate', '$timeout', 'userService'];

module.exports = WirplController;

/**
 * Контроллер страницы вывода пользователей и мероприятий.
 */
function WirplController ($scope, TDCardDelegate, $timeout, userService) {

	var cards = [
		{ image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
		{ image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
		{ image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
		{ image: 'http://c1.staticflickr.com/1/297/19072713565_be3113bc67_n.jpg' },
		{ image: 'http://c1.staticflickr.com/1/536/19072713515_5961d52357_n.jpg' },
		{ image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
		{ image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' }
	];

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

	initialize();

	// Removes a card from cards.active
	$scope.cardDestroyed = function (index) {
		$scope.cards.active.splice(index, 1);
	};

	// Adds a card to cards.active
	$scope.addCard = function (card) {
		$scope.cards.active.push(angular.extend({}, card));
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
		$scope.cards.disliked.push(card);
	};

	// On swipe right
	$scope.cardSwipedRight = function (index) {
		var card = $scope.cards.active[index];
		$scope.cards.liked.push(card);
	};

	function initialize() {

		userService.getUsers(function success (result) {

			var users = result.data;

			users.map(function (e) {

				$scope.addCard({

					image: e.photoUrl

				})

			});

		});

	}

}
