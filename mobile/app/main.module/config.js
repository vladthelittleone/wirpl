'use strict';

MainConfig.$inject = ['$stateProvider', '$ionicConfigProvider'];

module.exports = MainConfig;

/**
 * Инициализация состояния результатов пользователя.
 */
function MainConfig ($stateProvider, $ionicConfigProvider) {

	$ionicConfigProvider.tabs.position("top");

	$stateProvider
		.state('auth', {
			url: '/auth',
			templateUrl: 'main.module/templates/auth.html',
			controller: 'AuthController'
		})
		.state('dialog', {
			url: '/dialog/:id',
			templateUrl: 'main.module/templates/dialog.html',
			controller: 'DialogController as ctrl'
		})
		// this state is placed in the <ion-nav-view> in the index.html
		.state('main', {
			url: '/main',
			abstract: true,
			templateUrl: 'main.module/templates/tabs.html'
		})
		.state('main.wirpl', {
			url: '/wirpl',
			views: {
				'tab-wirpl': {
					templateUrl: 'main.module/templates/wirpl.html',
					controller: 'WirplController as ctrl'
				}
			}
		})
		.state('main.contact', {
			url: '/contact',
			views: {
				'tab-contact': {
					templateUrl: 'main.module/templates/contact.html',
					controller: 'ContactController as ctrl'
				}
			}
		});

}


