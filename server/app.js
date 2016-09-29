'use strict';

const express = require('express');
const passport = require('passport');
const path = require('path');
const httpLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Наши модули
const config = require('../server/config/');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/log')(module);

require('./utils/passport')();

const app = express();

var VKStrategy = require('./utils/passport/vk');
var maxHeap = 0;

app.use(httpLogger('dev'));
app.use(bodyParser.json()); // Парсер json в потоках
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Сторедж для сессии.
const MongoStore = require('connect-mongo/es5')(session);

app.use(session({
                    secret:            config.get('session:secret'), // ABCDE242342342314123421.SHA256
                    key:               config.get('session:key'),
                    resave:            config.get('session:resave'),
                    saveUninitialized: config.get('session:saveUninitialized'),
                    cookie:            config.get('session:cookie'),
                    store:             new MongoStore({mongooseConnection: mongoose.connection})
                }));

// init passportJS
app.use(passport.initialize());
app.use(passport.session());

passport.use('vk-login', VKStrategy.login);

require('../server/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {

    var err = new Error('На просторах вселенной страница не найдена!');
    err.status = 404;
    next(err);

});

app.use(function (err, req, res, next) {

    if (app.get('env') === 'development') {

        logger.error(err);

    }

});

if (app.get('env') === 'development') {

    setInterval(function () {

                    var heap = process.memoryUsage().heapUsed;

                    maxHeap = maxHeap < heap ? heap : maxHeap;

                    logger.info('Heap size: ' + heap + ', maximum heap size: ' + maxHeap);

                },
                10000);

}

module.exports = app;
