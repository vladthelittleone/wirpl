'use strict';

var express = require('express');
var router = express.Router();

var UserRatingHelp = require ('../utils/user.rating.help.js')();

module.exports = router;

router.post('/like', (req, res, next) => {

    UserRatingHelp.rateUser(req.query.firstUserId,
                            req.query.secondUserId,
                            true,
                            res,
                            next);

});

router.post('/dislike', (req, res, next) => {

    UserRatingHelp.rateUser(req.query.firstUserId,
                            req.query.secondUserId,
                            false,
                            res,
                            next);

});
