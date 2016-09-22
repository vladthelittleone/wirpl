'use strict';

var async = require('async');
var mongoose = require('utils/mongoose');

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
						vkId: vkId,
						// Вот тут хз как быть, вроде бы в это поле ничего не надо писать
						// но тогда поля отвечающие за хранение хэшированого пароля
						// и соли нужно сделать не обязательными, что тоже не очень то и хорошо
						password: email,
						// и не понятно как быть с этим параметром
						// ибо его задание через вк тот еще геммор
						// к томуже у вк юзера может быть не привязанно мыло
						// в общем это стоит обсудить
						isSubscribeOnEmail: false

					});

					newbie.save((err) => {

						callback(err, newbie, true);

					});
				}

				callback(null, user, false);
			}

	], callback);

}