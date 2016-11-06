'use strict';

Connection.$inject = ['$http', 'config'];

module.exports = Connection;

/**
 * Ссылки на REST API
 */
var links = {

    findRandomUser: '/find/random',

    rateCard: '/cards/rate'

};

/**
 * @since 28.09.16
 * @author Skurishin Vladislav
 */
function Connection($http, config) {

    var that = {};

    that.findRandomUser = findRandomUser;
    that.rateCard = rateCard;

    return that;

    function findRandomUser(success, error) {

        $http.get(config.buildUrl(links.findRandomUser))
            .then(success, error);

    }

    function rateCard(idCard, typeCard, isLike, success, error) {

        $http.post(config.buildUrl(links.rateCard),
                   {
                       idCard:   idCard,
                       isLike:   isLike,
                       typeCard: typeCard
                   })
            .then(success, error);

    }

}
