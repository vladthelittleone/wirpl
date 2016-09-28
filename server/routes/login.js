'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = router;

router.get('/vk', passport.authenticate('vk-login'));

router.get('/vk/callback', passport.authenticate('vk-login'), (req, res, next) => {

	res.send(req.session.passport.user);

});
