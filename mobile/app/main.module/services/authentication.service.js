'use strict';

Authentication.$inject = ['connection'];

module.exports = Authentication;

/**
 * Created by vaimer on 05.10.16.
 */

function Authentication(connection) {

  var that = {};

  that.login = login;
  that.logout = logout;
  that.isLoggedIn = isLoggedIn;
  that.getCurrentUser = getCurrentUser;

  // Текущий пользователь сервиса
  var currentUser;

  return that;

  /**
   * Метод входа в систему.
   *
   */
  function login(callback) {

    connection.login(function (result) {

      if (result) {

        currentUser = result;

      }

      callback && callback(result);

    });

  }

  /**
   * Метод выхода из системы.
   *
   * @param args.success коллбек успешного выполнения запроса
   * @param args.error коллбек ошибочного выполнения запроса
   */
  function logout(args) {

    var success = args.success;
    var error = args.error;

    connection.logout(success, error);

  }

  /**
   * Проверка авторизации пользователя.
   *
   * @param args.success коллбек успешного выполнения запроса
   * @param args.error коллбек ошибочного выполнения запроса
   */
  function isLoggedIn(args) {

    connection.login(args);

  }

  /**
   * Текущий пользователь и инфомрация о нем.
   *
   * @param callback
   */
  function getCurrentUser(callback) {

    if (currentUser) {

      return callback(currentUser);

    } else {

      isLoggedIn({

        success: function (res) {

          callback(res.data);

        }

      })

    }

  }
}
