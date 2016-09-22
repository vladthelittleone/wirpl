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
