'use strict';

/**
 * Created by iretd on 28.09.16.
 */

var eventsParser = require('./../../parsers/kudago/events');
var lodash = require('lodash');

module.exports = EventsService;

// Параметры для запроса картинок от API kudago.
// Безусловно, перечень параметров в дальнейшем будет расширяться.
// TODO
// 1. Мб в отдельный файлик потом красивенько все настройки вынести.
// 2. В этом объекте на данный момент содержаться 2 сущности: параметры запроса и
// фильтр данных. Мне кажется, их можно отделить друг от друга.
var eventsConfig = {
    eventsCountPerResponse: 10,
    // Города, по которым запрашиваем мероприятия.
    cities:                 'spb'
};

// Тип карточек, который будет назначен КАЖДОЙ карте,
// которая будет получена от этого сервиса.
var cardsType = 'kudago.events';

function EventsService() {

    var t = {};

    // Параметр контроля номера страницы, с которой мы получаем событие.
    // (события с API kudago выдаются постранично. Не целым списком).
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
     * будут исользоваться в шаблоне.
     * К примеру, представляем дату в строковом формате. Напрямую включаем через отдельное поле
     * url на картинку (так как их приходит несколько, мы отбираем случано любую из них). И т.д.
     * @param resultsArr массив с объектами, каждый из которых будет обработан данным методом.
     */
    function wrapResults(resultsArr) {

        var MESSAGE_ABOUT_FREE_EVENT = 'бесплатно';

        resultsArr.forEach(function (item) {

            // api kudago высылает время в секундах.
            // TODO
            // Дат может быть несколько (дата про ведения события известна
            // по нескольким дням).
            var dateOfEvent = new Date(item.dates[0].start * 1000);

            var images = item.images;
            var image = lodash.sample(images).image;

            item['image'] = image;

            item['type'] = cardsType;

            // Определяем свойства для вывода карточки на экран.
            item['head'] = item.location.name;
            item['title'] = item.short_title;
            item['body'] = item.is_free ? MESSAGE_ABOUT_FREE_EVENT :
                                          item.price;
            item['additional'] = dateOfEvent.toLocaleString();

        });

    }

}
