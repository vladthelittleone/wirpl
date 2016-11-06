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

        // TODO брать по сессии (после готовности авторизации).
        userId:   req.body.userId,
        cardId:   req.body.cardId,
        typeCard: req.body.typeCard,
        isLike:   req.body.isLike,
        callback: prepareRateResult

    };

    // Приступаем к обработке запроса ТОЛЬКО в случае корректно заданных полей:
    // idCard, typeCard, isLike.
    if (!lodash.isNil(args.cardId) &&
        args.typeCard &&
        !lodash.isNil(args.isLike)) {

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

/**
 * Получение оцененных карточек. Предполагает наличие следующих полей
 * в теле запроса:
 * isLike - тип (лайк/дизлайк) оценки, по которому будут отбираться карточки на выдачу.
 * Результатом обработки GET запроса по данному маршруту является выдача массива элементов,
 * формат которых описывается следующими полями:
 * typeCard - тип карточки;
 * idCard - номер карточки.
 */
router.get('/rate', (req, res, next) => {

    let isLike = req.query.isLike;

    // Приступаем к обработке запроса ТОЛЬКО в случае корректно заданных полей:
    // idCard, typeCard, isLike.
    if (!lodash.isNil(isLike)) {

        // TODO брать по сессии (после готовности авторизации).
        let userId = req.query.userId;

        CardRatingsModel.getCards(userId, isLike, prepareGetCardsResult);

        return;
    }

    prepareRateResult("Incorrect request parameters!");

    /**
     * Метод обработки окончания выставления рейтинга пользователем
     */
    function prepareGetCardsResult(error, cards) {

        if (error) {

            next(new HttpError(400, "Incorrect request parameters!"));

            return;

        }

        res.send(cards);
    };

});