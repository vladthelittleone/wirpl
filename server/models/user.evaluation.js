'use strict';

var async = require('async');
var mongoose = require('../utils/mongoose');

var User = require('../models/user').User;

var Schema = mongoose.Schema;

var schema = new Schema ({
    userIdOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userIdTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isLike: {
        type: Boolean,
        required: true
    }
});

schema.statics.evaluateUser = evaluateUser;

exports.UserEvaluation = mongoose.model('UserEvaluation', schema);

/**
 * Функция вносит инфу о том что пользователь с заданым id проставил отметку
 * другому пользователю
 */
function evaluateUser(userIdOne, userIdTwo, isLike, callback) {

    var UserEvaluation = this;

    async.waterfall([

        (callback) => {

            User.find({_id: {$in: [userIdOne, userIdTwo]}}, callback);

        },
        (users, callback) => {

            // проверяем что удалось найти двух пользователей
            if(users.length == 2) {

                // апдейтим инфо о лайке/дислайке
                UserEvaluation.findOneAndUpdate({

                    userIdOne: userIdOne,
                    userIdTwo: userIdTwo

                }, {

                    $set: {

                        isLike: isLike

                    }

                }, {

                    upsert: true

                }, callback);

            } else {

                callback("Users can't find.");

            }

        }
    ], callback);

}