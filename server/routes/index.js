'use strict';

const login = require ('./login');
var HttpError = require('../error').HttpError;

module.exports = function (app) {

	app.use ('/login', login);

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
