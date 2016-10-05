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
  that.currentUser = currentUser;
  that.register = register;

  return that;

  /**
   * Метод входа в систему.
   *
   * @param args.success коллбек успешного выполнения запроса
   * @param args.error коллбек ошибочного выполнения запроса
   * @param args.email идентификатор
   * @param args.password пароль
   */
  function login(args) {

    connection.login(args);

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
   * Метод регистрации в системе.
   *
   * @param args.success коллбек успешного выполнения запроса
   * @param args.error коллбек ошибочного выполнения запроса
   * @param args.email мэйл
   * @param args.password пароль
   */
  function register(args) {

    connection.register(args);

  }

  /**
   * Проверка авторизации пользователя.
   *
   * @param args.success коллбек успешного выполнения запроса
   * @param args.error коллбек ошибочного выполнения запроса
   */
  function isLoggedIn(args) {

    connection.isLoggedIn(args);

  }

  /**
   * Текущий пользователь и инфомрация о нем.
   *
   * @param callback
   */
  function currentUser(callback) {

    isLoggedIn({

      success: function (res) {

        callback(res.data);

      }

    })

  }
}
