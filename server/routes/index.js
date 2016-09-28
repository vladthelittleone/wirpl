'use strict';

const login = require ('./login');

module.exports = function (app) {

	// Мидлвер
	// Данный мидлвар осуществляет проверку аутентификации пользователя,
	// чтобы допустить его к нижележащим маршрутам.
	// app.use (function (req, res, next) {
	//
	// 	if(!req.isAuthenticated ()) {
	//
	// 		return next (null);
	//
	// 	}
	//
	// 	next ();
	//
	// });
	
	app.use ('/login', login);

};
