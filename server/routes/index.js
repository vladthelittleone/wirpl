'use strict';

const login = require ('./login');
const find = require ('./find');
const userEvaluation = require ('./user.evaluation');
var HttpError = require('../error').HttpError;

module.exports = function (app) {

	app.use ('/login', login);
	app.use ('/evaluation', userEvaluation);
	app.use ('/find', find);

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
