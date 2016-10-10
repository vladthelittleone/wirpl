'use strict';

/**
 * Created by iretd on 28.09.16.
 */

var eventsParser = require('./../parsers/kudago/events');

module.exports = KudagoService;

function KudagoService() {

    var t = {};

    var lastPackEvents;

    var eventsParseConfig = {
        currentPage:            1,
        eventsCountPerResponse: 10
    };
}

return t;

function getPackEvents() {

    eventsParser.getAllEvents(1, 'spb', Date.now() / 1000, function (error, result) {

        events = JSON.parse(result).results;

        events.forEach(function (item) {

            var images = item.images;

            var image = lodash.sample(images).image;

            var d = new Date(item.dates[0].start * 1000);

            cards.push({
                           type:    'event',
                           city:    item.location.name,
                           image:   image,
                           title:   item.short_title,
                           date:    d.toLocaleString(),
                           price:   item.price,
                           is_free: item.is_free
                       });

        });
    }

};
