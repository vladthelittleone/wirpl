'use strict';

UserService.$inject = ['connection'];

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
     * Метод расчета возраста пользователя по его дате рождения.
     */
    function calculateUserAgeByDate(dateString) {

        var now = new Date();
        var birthDate = new Date(dateString);

        var age = now.getFullYear() - birthDate.getFullYear();

        var m = now.getMonth() - birthDate.getMonth();

        var isBirthdayWillBeInCurrentMonth = m === 0 && now.getDate() < birthDate.getDate();
        var isBirthdayWillBeInNextMonths = m < 0 || m === 0 && now.getDate() < birthDate.getDate();

        // Так как в возрасте у нас разница между годами, то если день рождения
        // в следующих месяцах (т.е. НЕ СЕГОДНЯ и еще не было), то отнимаем от возраста единичку.
        if (isBirthdayWillBeInNextMonths) {

            age--;

        }

        return age;

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
            item['age'] = calculateUserAgeByDate(item.birthDate);
            item['title'] = item.userName;
            item['additional'] = [];
			item['additional'].push(item.universities[0] && item.universities[0].name);

        });

    }

}
