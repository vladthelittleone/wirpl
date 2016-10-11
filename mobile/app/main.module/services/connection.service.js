'use strict';

Connection.$inject = ['$http'];

module.exports = Connection;

/**
 * Ссылки на REST API
 */
var links = {

    login:    '/login/vk'
};

/**
 * Created by vaimer on 28.09.16.
 */

function Connection($http) {

  var that = {};

  that.login = login;

  return that;


  function login(success, error) {

    $http.get(links.login)
      .success(success)
      .error(error);

  }

}
