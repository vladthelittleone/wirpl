'use strict';

const login = require ('./login');
const find = require ('./find');
const rate = require('./cards/rate');

module.exports = function (app) {

	app.use ('/login', login);
	app.use ('/cards', rate);
	// TODO убрать после введения авторизации.
	// app.use(require('../middlewares/check.authentication'));
	app.use ('/find', find);

};
