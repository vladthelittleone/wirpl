'use strict';

MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = MainConfig;

/**
 * Инициализация состояния результатов пользователя.
 */
function MainConfig($stateProvider) {

	$stateProvider
		.state('auth', {
			url: '/auth',
			templateUrl: 'main.module/templates/auth.html',
			controller: 'AuthController'
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


