/**
 * Created by root on 29.09.16.
 */

var express = require('express');
const logger = require('./../utils/log')(module);
var router = express.Router();

var kudagoEventsParser = require('./../parsers/kudago/events');

module.exports = router;

router.get('/all', (req, res, next) => {

    var currentTimeInSeconds = Date.now() / 1000;
    var cityForSearch = 'spb';

    // Значение page проверяется внутри метода.
    // Так что за undefined волноваться не стоит.
    kudagoEventsParser.getAllEvents(req.page, cityForSearch, currentTimeInSeconds, (error, events) => {

        if (error) {

            logger.error('Cant get all events :(');

            // В случае ошибки, пока что просто отправляем пустой объект.
            res.send({});

        }

        // Отправляем клиенту событиям.
        // Здесь мы также можем предобработать события перед отправкой.
        res.send(events);

    });

});