'use strict';

var Rating = require('../models/rating.js').Rating;
var HttpError = require('../error').HttpError;

module.exports = UserRatingHelp;

function UserRatingHelp() {

    let that = {};

    that.rate = rate;

    return that;

    // who и whom получаются от пользователя и по этому их необходимо проверять
    // isLike проверять нет необходимости так
    // как он задаеться вызывающей функцией и не присылеться пользователем
    function rate(who, whom, isLike, res, next) {

        if (who && whom) {

            // заносим в бд инфу о том кто и что оценил
            Rating.rate(who, whom, isLike, (error) => {

                if (error) {

                    next(new HttpError(400, error));

                } else {

                    res.sendStatus(200)

                }

            });

        } else {

            next(new HttpError(400, "Request parameters aren't correct."));

        }

    }

}