'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение сервисов.
 */
var app = angular.module('main.module');

app.service('mainService', require('./main.service'));
app.service('connection', require('./connection.service'));
app.service('authentication', require('./authentication.service'));
