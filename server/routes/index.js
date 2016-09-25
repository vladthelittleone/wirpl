'use strict';

const login = require('./login');

module.exports = function (app) {

	// Мидлвер
	app.use('/login', login);

};
