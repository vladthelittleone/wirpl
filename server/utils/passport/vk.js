'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('../../config');

var vk = {};

module.exports = vk;

vk.login = new VKStrategy(config.get('vkStrategySettings'),

	(accessToken, refreshToken, params, profile, next) => {
		
			next (null, profile);

	}
);
