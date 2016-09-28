'use strict';

var express = require('express');
var router = express.Router();

var PeopleHelp = require ('../utils/people.help');

const MAN = 2;
const WOMAN = 1;
const ALL = 0;

module.exports = router;

router.get('/random.man', (req, res, next) => {

	PeopleHelp.getRandomUser(MAN, res);

});

router.get('/random.woman',  (req, res, next) => {

	PeopleHelp.getRandomUser(WOMAN, res);

});

router.get('/random',  (req, res, next) => {

	PeopleHelp.getRandomUser(ALL, res);

});