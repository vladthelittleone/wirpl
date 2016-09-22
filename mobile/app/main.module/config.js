'use strict';

MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = MainConfig;

/**
 * Инициализация состояния результатов пользователя.
 */
function MainConfig($stateProvider, $urlRouterProvider) {

	$stateProvider
	// this state is placed in the <ion-nav-view> in the index.html
		.state('main', {
			url: '/main',
			abstract: true,
			templateUrl: 'main.module/templates/tabs.html'
		})
		.state('main.list', {
			url: '/list',
			views: {
				'tab-list': {
					templateUrl: 'main.module/templates/list.html',
					// controller: 'SomeCtrl as ctrl'
				}
			}
		})
		.state('main.listDetail', {
			url: '/list/detail',
			views: {
				'tab-list': {
					templateUrl: 'main.module/templates/list-detail.html',
					// controller: 'SomeCtrl as ctrl'
				}
			}
		})
		.state('main.debug', {
			url: '/debug',
			views: {
				'tab-debug': {
					templateUrl: 'main.module/templates/debug.html',
					controller: 'DebugController as ctrl'
				}
			}
		});

}


