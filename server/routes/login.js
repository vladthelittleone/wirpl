'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

var validation = require('../utils/validation');

module.exports = router;

router.get('/vk', passport.authenticate('vk-login'));

router.get('/vk/callback', passport.authenticate('vk-login', {

	successRedirect: '/'

}));

/**
 * проверяем авторизован ли пользователь
 */
router.get('/check', (req, res, next) => {
	
	if (!req.isAuthenticated()) {

		return next(new HttpError(401, "Вы не авторизованы"));

	}

	res.send({

		email: req.user.email

	});

});
