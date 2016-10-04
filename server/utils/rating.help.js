'use strict';

var UserRating = require('../models/rating.js').UserRating;
var HttpError = require('../error').HttpError;

module.exports = UserRatingHelp;

function UserRatingHelp() {

    let that = {};

    that.rate = rate;

    return that;

    function rate(idUserOne, idUserTwo, isLike, res, next) {

        if (idUserOne && idUserTwo) {

            UserRating.rate(idUserOne, idUserTwo, isLike, (error) => {

                if (error) {

                    next(new HttpError(400, error));

                } else {

                    res.send({ result: "Success." });

                }

            });

        }
        else {

            next(new HttpError(400, "Request parameters can't correct."));

        }

    }

}