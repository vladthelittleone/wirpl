'use strict';

/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$rootScope', '$state', '$cordovaInAppBrowser', 'config'];

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $rootScope, $state, $cordovaInAppBrowser, config) {

	$scope.slideChanged = slideChanged;
	$scope.authenticate = authenticate;

	$rootScope.$on('$cordovaInAppBrowser:loadstart', cordovaLoadStart);
	$rootScope.$on('$cordovaInAppBrowser:loaderror', cordovaLoadError);

	var url = 'https://oauth.vk.com/authorize' +
		'?response_type=code' +
		'&redirect_uri=' + config.buildUrl('/login/vk/callback') +
		'&scope=email' +
		'&client_id=5643384';

	// Called each time the slide changes
	function slideChanged (index) {

		$scope.slideIndex = index;

	}

	function authenticate () {

		$state.go('main.wirpl');

		// var options = {
		// 	location: 'no',
		// 	clearcache: 'yes',
		// 	toolbar: 'yes'
		// };
		//
		// $cordovaInAppBrowser.open(url, '_blank', options);

	}

	function cordovaLoadError (e, event) {

		$cordovaInAppBrowser.close();

		alert('Извините, что-то пошло не так!');

	}

	function cordovaLoadStart (e, event) {

		//and this function is called, so you do something like
		if (event.url === config.buildUrl('/login/toapp')) {

			$cordovaInAppBrowser.close();

			$state.go('main.wirpl');

		}

	}
}
