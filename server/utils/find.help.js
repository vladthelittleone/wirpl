'use strict';

var User = require ('../models/user').User;

const config = require('../config');

var lodash = require('lodash');

module.exports = FindHelp;

function FindHelp() {

	var that = {};

	that.getRandomUser = getRandomUser;

	return that;

	function getRandomUser(sex, res) {

		var searchBySex = sex ? { sex: sex } : {};

		User.getUsers(searchBySex, (error, users) => {

			var result = [];

			if (!error) {

				result = lodash.sampleSize(users, config.get('findUserMaxValue'));

			}
			else {

				result = [{ error: "Error" }];

			}

			res.send(result);

		});

	}

    // Возвращает случайное число до max
	function getRandomArbitrary(max) {

		return Math.floor(Math.random() * max);

	}
}
