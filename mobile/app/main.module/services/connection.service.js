'use strict';

Connection.$inject = ['$http', 'config'];

module.exports = Connection;

/**
 * Ссылки на REST API
 */
var links = {

	findRandomUser: '/find/random',

};

/**
 * @since 28.09.16
 * @author Skurishin Vladislav
 */
function Connection ($http, config) {

	var that = {};

	that.findRandomUser = findRandomUser;

	return that;

	function findRandomUser (success, error) {

		$http.get(config.buildUrl(links.findRandomUser))
			.then(success, error);

	}

}
