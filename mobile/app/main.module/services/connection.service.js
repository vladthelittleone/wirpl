'use strict';

Connection.$inject = ['$http'];

module.exports = Connection;

/**
 * Ссылки на REST API
 */
var links = {

    login:    '/login',
    vkAuth:   '/vk/callback'
};

/**
 * Created by vaimer on 28.09.16.
 */

function Connection($http) {

  var that = {};

  that.authentication = authentication;

  return that;


  function authentication(callback){

    $http.get(links.vkAuth, callback);

  }
}
