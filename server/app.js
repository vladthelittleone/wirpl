'use strict';

const express = require('express');
const passport = require('passport');
// const path = require('path');
// const favicon = require('serve-favicon');
// const httpLogger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const session = require('express-session');

// Наши модули
const config = require('../server/config/');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/log')(module);
require('./utils/passport')();

var vkStrategy = require('./utils/passport/vk');

const app = express();

var maxHeap = 0;

// view engine setup (Т.к. у нас уже написан html, лучше пока не юзать движки)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(httpLogger('dev'));
// app.use(bodyParser.json()); // Парсер json в потоках
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());

// Сторедж для сессии.
const MongoStore = require('connect-mongo/es5')(session);

app.use(session({
                  secret: config.get('session:secret'), // ABCDE242342342314123421.SHA256
                  key: config.get('session:key'),
                  resave: config.get('session:resave'),
                  saveUninitialized: config.get('session:saveUninitialized'),
                  cookie: config.get('session:cookie'),
                  store: new MongoStore({mongooseConnection: mongoose.connection})
                }));
//
// if (app.get('env') === 'development') {
//
//   app.use(express.static(path.join(__dirname, 'public')));
// }
// else {
//
//   app.use(express.static(path.join(__dirname, 'build')));
//
// }

// init passportJS
app.use(passport.initialize());
app.use(passport.session());

passport.use ('vk-login', vkStrategy.login);

require('../server/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {

  var err = new Error('На просторах вселенной страница не найдена!');
  err.status = 404;
  next(err);

});

app.use(function (err, req, res, next) {

  // // Проверка на error/HttpError
  // if (typeof err == 'number') {
	//
  //   err = new HttpError(err);
	//
  // }

  if (app.get('env') === 'development') {

    logger.error(err);

  }


});

if (app.get('env') === 'development') {

  setInterval(function () {

                var heap = process.memoryUsage().heapUsed;

                maxHeap = maxHeap < heap ? heap : maxHeap;

                logger.info('Heap size: '  + heap + ', maximum heap size: ' + maxHeap);

              },
              10000);

}

module.exports = app;
