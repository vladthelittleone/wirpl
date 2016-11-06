'use strict';

var mongoose = require('../utils/mongoose');

var lodash = require('lodash');

var Schema = mongoose.Schema;

var schema = new Schema({
    userId:   {

        type:     Number,
        required: true

    },
    cardId:   {

        type:     Number,
        required: true

    },
    typeCard: {

        type:     String,
        required: true

    },
    isLike:   {

        type:     Boolean,
        required: true

    }
});

schema.statics.rateCard = rateCard;
schema.statics.getCards = getCards;

exports.CardRatings = mongoose.model('CardRatings', schema);

/**
 * Метод выставления оценки указанной карточки от
 * указанного пользователя.
 * @param args инкапсулирует в себя все необходимые свойства, которые
 * понадобятся в процессе выставления оценки:
 *
 * userId - id пользователя, который проставляет оценку;
 * cardId - номер карточки, которую он оценивает;
 * typeCard - тип карточки, которую он оценил;
 * isLike - флаг сообщающий о типе оценки (лайк/дизлайк);
 * callback - callback :)
 */
function rateCard(args) {

    this.findOneAndUpdate({

                              userId:   args.userId,
                              cardId:   args.cardId,
                              typeCard: args.typeCard

                          }, {

                              $set: {

                                  isLike: args.isLike

                              }

                          }, {

                              upsert: true

                          }, args.callback);

}

/**
 * Метод получения оцененных карточек заданным пользователем.
 * @param userId заданный пользователь, по которому осуществляется поиск
 *         оцененных им карточек;
 * @param isLike тип оценки (лайк/дизлайк), по которому селектируются карточки.
 */
function getCards(userId, isLike, callback) {

    // TODO cast к Number и Boolean!
    this.aggregate([{

        $match: {

            userId: userId,
            isLike: isLike
        }

    }], callback);

}