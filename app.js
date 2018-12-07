// the main module of the app
'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('app')
if (process.env.NODE_ENV !== 'production') {
  debug('App Mode: ' + process.env.NODE_ENV);
  //debug(process.env);   // log all system env variables
}

const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
// to connect to database
const mongo = require('mongodb');
const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
// routes
const index = require('./routes/index');
// initialize
const app = express();
debug('App Name: ' + process.env.npm_package_name)

/*
var refreshDB = function (req, res, next) {
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    res.render('database', {
      stories: docs
    });
  });
  next()
}
app.use(refreshDB)
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// condense the visible URL address in a client's browser
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use('/scripts', express.static(__dirname + '/node_modules/'));

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// define routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
