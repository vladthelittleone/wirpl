'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('../../config');
var User = require ('../../models/user').User;

var vk = {};

module.exports = vk;

vk.login = new VKStrategy(config.get('vkStrategySettings'),

	(accessToken, refreshToken, params, profile, next) => {

		User.findOrCreateVKUser (params.email, profile, (err, user) => {

				next (err, user);
				
			});

	}
);
