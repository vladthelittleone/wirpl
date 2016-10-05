'use strict';

var async = require('async');
var mongoose = require('../utils/mongoose');

var User = require('../models/user').User;

var Schema = mongoose.Schema;

var schema = new Schema ({
    who: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    whom: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    isLike: {

        type: Boolean,
        required: true

    }
});

schema.statics.rate = rate;

exports.Rating = mongoose.model('Rating', schema);

/**
 * Функция вносит инфу о том что пользователь с заданым id проставил отметку
 * другому пользователю
 */
function rate(who, whom, isLike, callback) {

    var Rating = this;

    async.waterfall([

        (callback) => {

            // провеяем что пользователи с такими id действительно существуют
            // так как поиск идет по id записи, особых нагрузок это не должно создавать
            User.find({

                _id: {

                    $in: [who, whom]

                }

            }, callback);

        },
        (users, callback) => {

            // Удостоверяемся в том, что пользователи существуют.
            if(users.length === 2) {

                // апдейтим инфо о лайке/дислайке
                // тоесть получаеться следующее если записи нет, то она будет
                // создана, если запись есть, то значение параметра isLike будет
                // заменнено на новое
                Rating.findOneAndUpdate({

                    who: who,
                    whom: whom

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