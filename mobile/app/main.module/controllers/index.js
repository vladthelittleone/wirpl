/**
 * Created by vladthelittleone on 08.06.16.
 *
 * Подключение модулей.
 */

var app = angular.module('main.module');

app.controller('AuthController', require('./auth.controller'));
app.controller('WirplController', require('./wirpl.controller'));
app.controller('ContactController', require('./contact.controller'));
