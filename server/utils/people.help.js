'use strict';

var User = require ('../models/user').User;

var peopleHelp = {};

module.exports = peopleHelp;

peopleHelp.getRandomUser = function (sex, res) {

	User.getUsers(sex, (error, users) => {

		var result;

		if (!error) {

			result = users[getRandomArbitrary(users.length)];

		}
		if (result === undefined){

			result = { error: "Error"}

		}

		res.send(result);

	});

};

// Возвращает случайное число до max 
function getRandomArbitrary(max) {

	return Math.floor(Math.random() * (max));
	
}