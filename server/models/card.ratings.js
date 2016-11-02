'use strict';

var mongoose = require('../utils/mongoose');

var lodash = require('lodash');

var Schema = mongoose.Schema;

var schema = new Schema({
    idUser:   {

        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',
        required: true

    },
    idCard:   {

        type:     mongoose.Schema.Types.Number,
        required: true

    },
    typeCard: {

        type:     mongoose.Schema.Types.String,
        required: true

    },
    isLike:   {

        type:     mongoose.Schema.Types.Boolean,
        required: true

    }
});

schema.statics.rateCard = rateCard;

exports.CardRatings = mongoose.model('CardRatings', schema);

/**
 * Метод выставления оценки указанной карточки от
 * указанного пользователя.
 * @param args инкапсулирует в себя все необходимые свойства, которые
 * понадобятся в процессе выставления оценки:
 *
 * idUser - id пользователя, который проставляет оценку;
 * idCard - номер карточки, которую он оценивает;
 * typeCard - тип карточки, которую он оценил;
 * isLike - флаг сообщающий о типе оценки (лайк/дизлайк);
 * callback - callback :)
 */
function rateCard(args) {


    this.findOneAndUpdate({

                              idUser:   args.idUser,
                              idCard:   args.idCard,
                              typeCard: args.typeCard

                          }, {

                              $set: {

                                  isLike: args.isLike

                              }

                          }, {

                              upsert: true

                          }, args.callback);

}