'use strict';

/**
 * Created by iretd on 28.09.16.
 */

var eventsParser = require('./../../parsers/kudago/events');
var lodash = require('lodash');

module.exports = EventsService;

var eventsConfig = {
    eventsCountPerResponse: 2,
    cities:                 'spb'
};

function EventsService() {

    var t = {};

    var cardsType = 'kudago.events';

    var pageForEvents = 1;

    t.requirePackEvents = requirePackEvents;
    t.cardsType = cardsType;

    return t;

    /**
     * Метод выгрузки следующего пака событий с API kudago.
     */
    function requirePackEvents(callback) {

        // Начинаем запрос событий с текущего времени (в секундах).
        var currentTimeInSeconds = Date.now() / 1000;

        eventsParser.getAllEvents(pageForEvents,
                                  eventsConfig.eventsCountPerResponse,
                                  eventsConfig.cities,
                                  currentTimeInSeconds,
                                  function (error, response) {

                                      if (!error) {

                                          // Забираем массив с информацией по событиям.
                                          // TODO
                                          // Почему сразу не JSON ?
                                          var resultsArr = JSON.parse(response).results;

                                          wrapResults(resultsArr);

                                          callback(null, cardsType, resultsArr);

                                          // Если еще имеются события для выдачи на следующих страницах,
                                          // то переходим к следующей странице.
                                          // В противном случае, возвращаемся к первой странице.
                                          pageForEvents = response.next !== null ? pageForEvents + 1 :
                                                          1;

                                      }

                                  });

    }

    /**
     * Оборачиваем результаты дополнительными полями, которые преимущественно
     * будут исользовать в шаблоне.
     * К примеру, представляем дату в строковом формате. Напрямую включаем через отдельное поле
     * url на картинку (так как их приходит несколько, мы отбираем случано любую из них). И т.д.
     * @param results
     */
    function wrapResults(resultsArr) {

        resultsArr.forEach(function (item) {

            // api kudago высылает время в секундах.
            // TODO
            // Дат может быть несколько (дата про ведения события известна
            // по нескольким дням).
            var dateOfEvent = new Date(item.dates[0].start * 1000);

            var images = item.images;
            var image = lodash.sample(images).image;

            item['date'] = dateOfEvent.toLocaleString();
            item['image'] = image;
            item['type'] = cardsType;

        });

    }

}
