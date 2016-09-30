'use strict';

var UserEvaluation = require('../models/user.evaluation').UserEvaluation;

module.exports = UserEvaluationHelp;

function UserEvaluationHelp() {

    var that = {};

    that.evaluateUser = evaluateUser;

    return that;

    function evaluateUser(idUserOne, idUserTwo, isLike, res) {

        if (idUserOne && idUserTwo) {

            UserEvaluation.evaluateUser(idUserOne, idUserTwo, isLike, (error) => {

                var result = error ? { error: error }:
                                     { result: "Save." };

                res.send(result);

            });

        }
        else {

            res.send({error: "Send param can't correct."});

        }

    }

}