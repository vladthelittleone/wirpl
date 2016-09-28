/**
 * Created by iretd on 28.09.16.
 */

var app = angular.module('main.module');

app.service('kudagoEventsService', require('./../../../../../server/parsers/kudago/events.js'));
app.service('kudagoService', require('./kudago.service.js'));
