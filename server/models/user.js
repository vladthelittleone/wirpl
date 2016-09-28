'use strict';

var async = require('async');
var mongoose = require('../utils/mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var schema = new Schema ({
	email: {
		type: String
	},
	vkId: {
		type: String,
		unique: true,
		required: true
	},
	userName: {
		type: String
	},
	sex: {
		type: Number
	},
	photoUrl: {
		type: String
	},
	birthDate: {
		type: Date
	},
	smallPhotoUrl: {
		type: String
	},
	universities: {
		type: Array
	},
	city: {
		type: String
	},
	created: {
		type: Date,
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
function findOrCreateVKUser (email, profile, callback) {

	var User = this;

	async.waterfall([

		(callback) => {

			User.findOne({vkId: profile.id}, callback);

		},
		(user, callback) => {

			if (!user) {

				var response = profile._json;

				var newbie = new User ({

					email: email,
					vkId: profile.id,
					userName: profile.displayName,
					sex: response.sex,
					photoUrl: response.photo_max,
					smallPhotoUrl: response.photo,
					universities: response.universities,
					city: response.city.title,
					birthDate: moment(response.bdate, "DD.MM.YYYY")

				});

				newbie.save((err, _user) => {

					callback(err, _user)

				});

			}
			else {

				callback (null, user);
				
			}
			
		}], callback);

}
