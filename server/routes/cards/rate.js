'use strict';

var express = require('express');
var router = express.Router();

var lodash = require('lodash');

var HttpError = require('../../error').HttpError;

var CardRatingsModel = require('../../models/card.ratings').CardRatings;

module.exports = router;

/**
 * Обработка лайка карточки. Предполагает наличие следующих полей
 * в теле запроса:
 * cardId - идентификатор карточки, которую пользователь лайкнул;
 * cardType - тип карточки.
 * Именно ТИП карточки и ее НОМЕР (cardId) выступают в качестве
 * идентификатора для карточки среди всех остальных.
 */
router.post('/rate', (req, res, next) => {

    let args = {

        idUser:   req.user.userId,
        idCard:   req.body.idCard,
        typeCard: req.body.typeCard,
        isLike:   req.body.isLike,
        callback: prepareRateResult

    };

    // Приступаем к обработке запроса ТОЛЬКО в случае корректно заданных полей:
    // idCard, typeCard, isLike.
    if (!lodash.isNil(args.idCard) && args.typeCard && args.isLike) {

        CardRatingsModel.rateCard(args);

        return;
    }

    prepareRateResult("Incorrect request parameters!");

    /**
     * Метод обработки окончания выставления рейтинга пользователем
     * @param error
     */
    function prepareRateResult(error) {

        if (error) {

            next(new HttpError(400, "Incorrect request parameters!"));

            return;

        }

        res.sendStatus(200);
    };

});