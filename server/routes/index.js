'use strict';

const login = require('./login');
const events = require('./events');

module.exports = function (app) {
	
	app.use('/login', login);
	app.use('/events', events);

};
