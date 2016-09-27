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
