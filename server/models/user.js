'use strict';

var async = require('async');
var mongoose = require('../utils/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	email:              {
		type:     String,
		unique:   true,
		required: true
	},
	vkId:		        {
		type:     String
	},
	created:            {
		type:    Date,
		default: Date.now
	}
});

schema.statics.findOrCreateVKUser = findOrCreateVKUser;

exports.User = mongoose.model('User', schema);

/**
 * Функция ищет пользователя по его vk id
 * если пользователь не найдет функция создает нового пользователя
 * в базе
 */
function findOrCreateVKUser (vkId, email, callback) {

	var User = this;

	async.waterfall([

		(callback) => {

			User.findOne({vkId: vkId}, callback);

		},
		(user, callback) => {

			if (!user) {

				var newbie = new User ({

					email: email,
					vkId: vkId

				});

				newbie.save((err) => {

					callback(err, newbie);

				});
			}

			callback(null, user);
		}

	], callback);

}
