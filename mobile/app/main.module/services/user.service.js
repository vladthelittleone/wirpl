'use strict';

UserService.$inject = ['connection'];

// Иниициализация библиотеки moment.
// Результатом require('moment-range') является определение
// необходимых объектов-прототипов. Так что это не есть описка :)
var moment = require('moment');
require('moment-range');

module.exports = UserService;

var cardsType = "human";

// TODO число запрашиваемых пользователей с клиента.
// TODO фидьтр с для запроса пользователей.
// TODO предусмотреть обработку ситуации окончания в выдаче всех людей из базы.
//      Т.е. обрабатывать момент, когда мы получили ВСЕХ людей и дальшей по фиду ничего нет.
function UserService (connection) {

	var t = {};

	t.getUsers = getUsers;
    t.cardsType = cardsType;

	return t;

	function getUsers(callback) {

        // TODO обработка ошибочной ситуации.
		connection.findRandomUser(successHandler, errorHandler);

		/**
         * Обрабатываем успешную загрузку пользователей.
         * @param result
         */
        function successHandler(result) {

            var users = result.data;

            // Если юзеры есть.
            if (users.length) {

                wrapResults(users);

                callback(null, cardsType, users);

            }

        }

        function errorHandler(result) {

            // TODO предусмотреть обработку.
        }

	}

    /**
     * Оборачиваем результаты дополнительными полями, которые преимущественно
     * будут исользоваться в шаблоне.
     * К примеру, представляем дату в строковом формате. Напрямую включаем через отдельное поле
     * url на картинку (так как их приходит несколько, мы отбираем случано любую из них). И т.д.
     * @param resultsArr массив с объектами, каждый из которых будет обработан данным методом.
     */
    function wrapResults(resultsArr) {

        resultsArr.forEach(function (item) {

            item['image'] = item.photoUrl;

            item['type'] = cardsType;

            // Определяем свойства для вывода карточки на экран.
            item['title'] = item.userName;
            item['additional'] = [];
			item['additional'].push(item.universities[0] && item.universities[0].name);

            // Определяем возраст человека (с сервера приходит только дата его рождения).
            item['age'] = moment.range(item.birthDate, moment()).diff('years');

        });

    }

}
