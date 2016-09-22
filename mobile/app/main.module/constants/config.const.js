'use strict';

module.exports = Config();

function Config () {

  var config = {

    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/
      'SERVER_URL': 'https://DEVSERVER/api',
          'SOME_OTHER_URL': '/postman-proxy'
      /*endinject*/
    },

    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }

  };

  return config;

}
