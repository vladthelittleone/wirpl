'use strict';

const login = require ('./login');
const find = require ('./find');
const rating = require ('./rating.js');

module.exports = function (app) {

	app.use ('/login', login);
	app.use(require('../middlewares/check.authentication'));
	app.use ('/rating', rating);
	app.use ('/find', find);

};
