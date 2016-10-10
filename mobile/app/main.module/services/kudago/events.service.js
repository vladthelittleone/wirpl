'use strict';

/**
 * Created by iretd on 28.09.16.
 */

var eventsParser = require('./../../parsers/kudago/events');

module.exports = EventsService;

function EventsService() {

    var packEvents;

    var t = {};

    var whoWaitingForPackEvents;

    var pageForEvents = 1;

    var eventsParseConfig = {
        eventsCountPerResponse: 2,
        cities:                 'spb'
    };

    t.getPackEvents = getPackEvents;

    requireNextPackEvents(updatePackEvents);

    return t;

    /**
     * Метод возврата текущего пака событий и затребования выгрузки следующего.
     * Так как выгрузка следующего пака прроисходит асинхронно, безусловно следующий,
     * сразу за текущим, вызов getPackEvents может вернуть неизмененное состояние
     * packEvents.
     * Но по логике работы нашего приложения - периода между запросами значения packEvents
     * должно хватать на выгрузку нового пака.
     * @returns {*}
     */
    function getPackEvents(callback) {

        // Требуем выгрузку следующего пака событий.
        requireNextPackEvents(updatePackEvents);

        // Если текущий пак событий определен - передаем его сразу как результат
        // и очищаем. Это будет служить флагом того, что этот пак был выдан.
        if (packEvents) {

            callback(null, packEvents);
            packEvents = null;

        } else {

            // В противном случае, запоминаем того, кто запрашивал события.
            // Он их сразу получит после их выгрузки.
            whoWaitingForPackEvents = callback;

        }

    }

    /**
     * Метод выгрузки следующего пака событий с API kudago.
     */
    function requireNextPackEvents(callback) {

        // Начинаем запрос событий с текущего времени (в секундах).
        var currentTimeInSeconds = Date.now() / 1000;

        eventsParser.getAllEvents(pageForEvents,
                                  eventsParseConfig.eventsCountPerResponse,
                                  eventsParseConfig.cities,
                                  currentTimeInSeconds,
                                  function (error, result) {

                                      if (!error) {

                                          var results = JSON.parse(result).results;

                                          callback(null, JSON.parse(result).results);

                                          // Если еще имеются события для выдачи на следующих страницах,
                                          // то переходим к следующей странице.
                                          // В противном случае, возвращаемся к первой странице.
                                          pageForEvents = results.next !== null ? pageForEvents + 1 :
                                              1;
                                      }

                                  });


    }

    function updatePackEvents(error, results) {

        if (!error) {

            if (whoWaitingForPackEvents) {

                whoWaitingForPackEvents(null, results);

                whoWaitingForPackEvents = null;

            } else {

                packEvents = results;

            }

        }

    }

}
