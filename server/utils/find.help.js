'use strict';

var User = require('../models/user').User;

const config = require('../config');

var lodash = require('lodash');

module.exports = FindHelp;

function FindHelp() {

    var that = {};

    that.getRandomUser = getRandomUser;

    return that;

    function getRandomUser(sex, res) {

        var searchBySex = sex ? {sex: sex} :
                                {};

        User.getUsers(searchBySex, (error, users) => {

            var result = error ? [{error: "Error"}] :
                                 lodash.sampleSize(users, config.get('countOfRandomUsers'));

            res.send(result);

        });

    }

}
