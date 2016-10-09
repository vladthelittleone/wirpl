'use strict';

/**
 * Парсер событий с API kudago (http://api.kudago.com).
 *
 * Поля, которые позволяет получать о событии api kudago:
 * id - идентификатор
 * publication_date - дата публикации
 * dates - даты проведения
 * title - название
 * short_title - короткое название
 * slug - слаг
 * place - место проведения
 * description - описание
 * body_text - полное описание
 * location - город проведения
 * categories - список категорий
 * tagline - тэглайн
 * age_restriction - возрастное ограничение
 * price - стоимость
 * is_free - бесплатное ли событие
 * images - картинки
 * favorites_count - сколько пользователей добавило событие в избранное
 * comments_count - число комментариев к событию
 * site_url - адрес события на сайте kudago.com
 * tags - тэги события
 * participants - агенты события
 *
 * ВАЖНЫЙ МОМЕНТ.
 * В запросах к kudago единица измерерния времени - СЕКУНДА.
 *
 * Created by iretd on 28.09.16.
 */

var httpRequest = require('request');

// URL'ы для похода за информацией по событиям к kudago.
var urls = {
    events:          'http://kudago.com/public-api/v1.3/events/',
    eventsOfTheDay:  'https://kudago.com/public-api/v1.3/events-of-the-day',
    eventCategories: 'https://kudago.com/public-api/v1.3/event-categories'
};

module.exports = Events();

function Events() {

    // 100 - максимальное число, которое позволяет высылать API в версии 1.3
    var EVENTS_COUNT_PER_RESPONSE = 100;
    // Начальное значение номера страницы просмотра событий.
    var INIT_PAGE_NUMBER_VALUE = 1;

    var t = {};

    t.getAllEvents = getAllEvents;

    return t;

    /**
     * Метод обработки значения номера страницы выдачи информации с api kudago.
     * Данный параметр должен быть задан в запросе корректно. Именно поэтому необходима
     * его предварительная обработка.
     * @param page
     * @returns {number}
     */
    function preparePageNumberValue(page) {

        return page && (page > INIT_PAGE_NUMBER_VALUE) ? page :
                                                         INIT_PAGE_NUMBER_VALUE;
    }

    /**
     * Метод получения всех событий с API kudago (с возможностью указать фильтр).
     * В данный метод включены только 2 поля для фильтрации (возможно расширить).
     * @page номер страницы по выдачи событий (kudago разбивает список событий, а их большое
     *       количество, на страницы). Нумерация страниц идет с 1.
     * @param location место проведения всех событий.
     * @param actualSinceInSeconds включить в выдачу только те события,
     *                                  которые начались после указанного момента времени (в СЕКУНДАХ).
     * @param callback метод обратного вызова для получения списка всех событий.
     */
    function getAllEvents(page,
                          location,
                          actualSinceInSeconds,
                          callback) {

        httpRequest({
                        url:    urls.events,
                        qs:     {
                            page_size:    EVENTS_COUNT_PER_RESPONSE,
                            page:         preparePageNumberValue(page),
                            actual_since: actualSinceInSeconds,
                            location:     location,
                            // Поля, которые хотим получить о каждом событии в ответе.
                            fields:       'id,' +
                                          'dates,' +
                                          'site_url,' +
                                          'title,' +
                                          'short_title,' +
                                          'slug,' +
                                          'place,' +
                                          'description,' +
                                          'body_text,' +
                                          'location,' +
                                          'price,' +
                                          'is_free,' +
                                          'images'
                        },
                        method: 'GET'
                    },
                    function(error, response, body) {

                        // TODO
                        // Предусмотреть обработку ситуации, когда error undefined, но
                        // statusCode не 200.
                        if (error || response.statusCode !== 200) {

                            console.log('There is some problem with get all events from kudago api: ',
                                         error,
                                         'Response code: ',
                                         response.statusCode);

                        }

                        callback(error, body);

                    });

    }

}
