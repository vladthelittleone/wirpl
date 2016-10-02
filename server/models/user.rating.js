'use strict';

var async = require('async');
var mongoose = require('../utils/mongoose');

var User = require('../models/user').User;

var Schema = mongoose.Schema;

var schema = new Schema ({
    firstUserId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    twoUserId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    isLike: {

        type: Boolean,
        required: true

    }
});

schema.statics.rateUser = rateUser;

exports.UserRating = mongoose.model('UserRating', schema);

/**
 * Функция вносит инфу о том что пользователь с заданым id проставил отметку
 * другому пользователю
 */
function rateUser(firstUserId, twoUserId, isLike, callback) {

    var UserEvaluation = this;

    async.waterfall([

        (callback) => {

            // провеяем что пользователи с такими id действительно существуют
            // так как поиск идет по id записи, особых нагрузок это не должно создавать
            //
            User.find({

                _id: {

                    $in: [firstUserId, twoUserId]

                }

            }, callback);

        },
        (users, callback) => {

            // проверяем что удалось найти двух пользователей
            if(users.length == 2) {

                // апдейтим инфо о лайке/дислайке
                // тоесть получаеться следующее если записи нет, то она будет
                // создана, если запись есть, то значение параметра isLike будет
                // заменнено на новое
                UserEvaluation.findOneAndUpdate({

                    firstUserId: firstUserId,
                    twoUserId: twoUserId

                }, {

                    $set: {

                        isLike: isLike

                    }

                }, {

                    // флаг, означает, если запись не обнаруженна,
                    // то необходимо создать новую.
                    upsert: true

                }, callback);

            } else {

                callback("Can't find users.");

            }

        }
    ], callback);

}