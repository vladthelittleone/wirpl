'use strict';

ContactController.$inject = ['$scope', '$ionicModal', '$timeout', '$ionicScrollDelegate', '$stateParams'];

module.exports = ContactController;

/**
 * Created by vaimer on 07.10.16.
 */
function ContactController ($scope, $ionicModal, $timeout, $ionicScrollDelegate, $stateParams) {

	$scope.people = [
		{
			image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg',
			name: 'Надя',
			userId: 1
		},
		{
			image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg',
			name: 'Олег',
			userId: 2
		},
		{
			image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
			name: 'Жека',
			userId: 3
		}, {
			image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
			name: 'Вася',
			userId: 4
		}, {
			image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
			name: 'Жека',
			userId: 5
		}, {
			image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
			name: 'Олеся'
		}, {
			image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
			name: 'Кекс',
			userId: 6
		}
	];

	var options = {
		scope: $scope,
		animation: 'slide-in-right'
	};

	$ionicModal
		.fromTemplateUrl('main.module/templates/dialog.html', options)
		.then(function (modal) {

			$scope.modal = modal;

		});

	$scope.hideTime = true;

	var alternate,
		isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

	$scope.sendMessage = function () {

		alternate = !alternate;

		var d = new Date();
		d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

		$scope.messages.push({
								 userId: alternate ? '12345' : '54321',
								 text: $scope.data.message,
								 time: d
							 });

		delete $scope.data.message;
		$ionicScrollDelegate.scrollBottom(true);

	};

	$scope.inputUp = function () {

		if (isIOS) $scope.data.keyboardHeight = 216;
		$timeout(function () {
			$ionicScrollDelegate.scrollBottom(true);
		}, 300);

	};

	$scope.inputDown = function () {

		if (isIOS) $scope.data.keyboardHeight = 0;
		$ionicScrollDelegate.resize();

	};

	$scope.closeKeyboard = function () {

		// cordova.plugins.Keyboard.close();

	};

	$scope.data = {};
	$scope.myId = '12345';
	$scope.messages = [];

}
