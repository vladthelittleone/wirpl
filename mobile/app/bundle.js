(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Загружаем модули.
 */
require('./main.module');

/**
 * @description Главный модуль angularJS,
 * описывающий все модули.
 */
var app = angular.module('wirpl', [
      'main.module'
    ])
    .config(configBlock)
    .run(runBlock);

runBlock.$inject = ['$state'];
configBlock.$inject = ['$urlRouterProvider'];

app.config(configBlock);
app.run(runBlock);

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider) {

  // Для всех необработанных переходов
  $urlRouterProvider.otherwise('/auth');

}

/**
 * Запуск скрипта на старте приложения.
 */
function runBlock($state) {

}

},{"./main.module":10}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
'use strict';

module.exports = Config();

function Config () {

  var config = {

    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/
      'SERVER_URL': 'https://DEVSERVER/api',
          'SOME_OTHER_URL': '/postman-proxy'
      /*endinject*/
    },

    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }

  };

  return config;

}

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение констант.
 */
var app = angular.module('main.module');

app.constant('config', require('./config.const'));

},{"./config.const":3}],5:[function(require,module,exports){
/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate'];

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $state, $ionicSlideBoxDelegate) {

	// Called each time the slide changes
	$scope.slideChanged = function (index) {

		$scope.slideIndex = index;

	};

}

},{}],6:[function(require,module,exports){
'use strict';

DebugController.$inject = ['$log', '$http', '$timeout', 'mainService', 'config', '$cordovaDevice'];

module.exports = DebugController;

function DebugController ($log, $http, $timeout, mainService, config, $cordovaDevice) {

	$log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);

	// bind data from services
	this.someData = mainService.someData;
	this.ENV = config.ENV;
	this.BUILD = config.BUILD;
	// get device info
	ionic.Platform.ready(function () {
		if (ionic.Platform.isWebView()) {
			this.device = $cordovaDevice.getDevice();
		}
	}.bind(this));

	// PASSWORD EXAMPLE
	this.password = {
		input: '', // by user
		strength: ''
	};
	this.grade = function () {
		var size = this.password.input.length;
		if (size > 8) {
			this.password.strength = 'strong';
		} else if (size > 3) {
			this.password.strength = 'medium';
		} else {
			this.password.strength = 'weak';
		}
	};
	this.grade();

	// Proxy
	this.proxyState = 'ready';
	this.proxyRequestUrl = config.ENV.SOME_OTHER_URL + '/get';

	this.proxyTest = function () {
		this.proxyState = '...';

		$http.get(this.proxyRequestUrl)
			.then(function (response) {
				$log.log(response);
				this.proxyState = 'success (result printed to browser console)';
			}.bind(this))
			.then($timeout(function () {
				this.proxyState = 'ready';
			}.bind(this), 6000));
	};

}

},{}],7:[function(require,module,exports){
/**
 * Created by vladthelittleone on 08.06.16.
 *
 * Подключение модулей.
 */

var app = angular.module('main.module');

app.controller('DebugController', require('./debug.controller'));
app.controller('AuthController', require('./auth.controller'));

},{"./auth.controller":5,"./debug.controller":6}],8:[function(require,module,exports){
'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение директив.
 */
var app = angular.module('main.module');

},{}],9:[function(require,module,exports){
'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение фильтров.
 */
var app = angular.module('main.module');

},{}],10:[function(require,module,exports){
'use strict';

var app = angular.module('main.module', [
	'ionic',
	'ngCordova',
	'ui.router'
]);

app.config(require('./config'));

/**
 * Загружаем директивы, сервисы и т.д.
 */
require('./services');
require('./directives');
require('./controllers');
require('./constants');
require('./filters');
require('./filters');

},{"./config":2,"./constants":4,"./controllers":7,"./directives":8,"./filters":9,"./services":11}],11:[function(require,module,exports){
'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение сервисов.
 */
var app = angular.module('main.module');

app.service('mainService', require('./main.service'));

},{"./main.service":12}],12:[function(require,module,exports){
'use strict';

MainService.$inject = ['$log', '$timeout'];

module.exports = MainService;

function MainService ($log, $timeout) {

	$log.log('Hello from your Service: Main in module main');

	// some initial data
	this.someData = {
		binding: 'Yes! Got that databinding working'
	};

	this.changeBriefly = function () {
		var initialValue = this.someData.binding;
		this.someData.binding = 'Yeah this was changed';

		var that = this;
		$timeout(function () {
			that.someData.binding = initialValue;
		}, 500);
	};

}

},{}]},{},[1]);
