'use strict';

var express = require('express');
var router = express.Router();

var FindHelp = require ('../utils/find.help.js')();

/**
 * если sex = 1 возвращает только женщин
 * если sex = 2 возвращает только мужчин
 * если sex = 0 возвращает всех
 */

const MAN = 2;
const WOMAN = 1;
const ALL = 0;

module.exports = router;

router.get('/random.man', (req, res, next) => {

	FindHelp.getRandomUser(MAN, res);

});

router.get('/random.woman',  (req, res, next) => {

	FindHelp.getRandomUser(WOMAN, res);

});

router.get('/random',  (req, res, next) => {

	FindHelp.getRandomUser(ALL, res);

});