'use strict';

var async = require('async');
var mongoose = require('../utils/mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var schema = new Schema({
    email:         {

        type: String

    },
    userId:          {

        type:     Number,
        unique:   true,
        required: true

    },
    userName:      {

        type: String

    },
    sex:           {

        type: Number

    },
    photoUrl:      {

        type: String

    },
    birthDate:     {

        type: Date

    },
    smallPhotoUrl: {

        type: String

    },
    universities:  {

        type: Array

    },
    city:          {

        type: String

    },
    created:       {

        type:    Date,
        default: Date.now

    }
});

schema.statics.findOrCreateVKUser = findOrCreateVKUser;
schema.statics.getUsers = getUsers;

exports.User = mongoose.model('User', schema);

function getUsers(searchParam, callback) {

    var User = this;

    async.waterfall([

                        (callback) => {

                            User.find(searchParam, callback);

                        }, (users, callback) => {

            let error = users.length ? null :
                        "Can't find users.";

            callback(error, users);


        }], callback);
}

/**
 * Функция ищет пользователя по его vk id
 * если пользователь не найдет функция создает нового пользователя
 * в базе
 */
function findOrCreateVKUser(email, profile, callback) {

    var User = this;

    async.waterfall([

                        (callback) => {

                            var response = profile._json;

                            User.findOneAndUpdate({

                                                      userId: profile.id

                                                  }, {

                                                      email:         email,
                                                      userName:      profile.displayName,
                                                      sex:           response.sex,
                                                      photoUrl:      response.photo_max,
                                                      smallPhotoUrl: response.photo,
                                                      universities:  response.universities,
                                                      city:          response.city.title,
                                                      birthDate:     moment(response.bdate, "DD.MM.YYYY")

                                                  }, {

                                                      upsert: true,
                                                      new:    true

                                                  }, callback);

                        }], callback);

}
