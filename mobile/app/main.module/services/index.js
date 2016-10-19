'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение сервисов.
 */
var app = angular.module('main.module');

app.service('userService', require('./user.service'));
app.service('mainService', require('./main.service'));
app.service('connection', require('./connection.service'));
app.service('authentication', require('./authentication.service'));
app.service('cardsManager', require('./cards.manager.service'));

// Инициализируем сервисы kudago
app.service('kudagoEvents', require('./kudago/events.service'));
