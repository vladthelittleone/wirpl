'use strict';

const login = require ('./login');
var HttpError = require('../error').HttpError;
const events = require('./events');

module.exports = function (app) {

	app.use('/login', login);
	app.use('/events', events);

	// Мидлвер
	// Данный мидлвар осуществляет проверку аутентификации пользователя,
	// чтобы допустить его к нижележащим маршрутам.
	app.use (function (req, res, next) {

		if(!req.isAuthenticated ()) {

			return next (new HttpError(401, "Вы не авторизованы"));

		}

		next ();

	});

};
