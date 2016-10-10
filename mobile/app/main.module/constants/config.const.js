'use strict';

module.exports = Config();

function Config () {

	var t = {};

	// gulp environment: injects environment vars
	t.ENV = {
		/*inject-env*/
		'SERVER_URL': 'http://localhost:8080',
		'SOME_OTHER_URL': '/postman-proxy'
		/*endinject*/
	};

	// gulp build-vars: injects build vars
	t.BUILD = {
		/*inject-build*/
		/*endinject*/
	};

	t.buildUrl = function (url) {

		return t.ENV.SERVER_URL + url;

	};

	return t;

}
