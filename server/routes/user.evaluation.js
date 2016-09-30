'use strict';

var express = require('express');
var router = express.Router();

var UserEvaluationHelp = require ('../utils/user.evaluation.help')();

module.exports = router;

router.get('/like', (req, res, next) => {


    UserEvaluationHelp.evaluateUser(req.query.idUserOne,
                                    req.query.idUserTwo,
                                    true,
                                    res);

});

router.get('/dislike', (req, res, next) => {

    UserEvaluationHelp.evaluateUser(req.query.idUserOne,
                                    req.query.idUserTwo,
                                    false,
                                    res);

});
