/**
 * @author Aleksandrov Oleg
 * @since 05.10.16
 */

var HttpError = require('../error').HttpError;

// Мидлвер
// Данный мидлвар осуществляет проверку аутентификации пользователя,
// чтобы допустить его к нижележащим маршрутам.
module.exports = function (req, res, next) {

    if(!req.isAuthenticated()) {

        return next (new HttpError(401, "Вы не авторизованы"));

    }

    next();

}
