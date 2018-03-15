// check the env
var mode = process.env.NODE_ENV
console.log('Environment: ' + mode)
if (process.env.NODE_ENV !== 'production') {
  // dev-module to load env variables
  const dotenv = require('dotenv')
  const result = dotenv.config()
  if (result.error) {
    throw result.parsed
  }
}

var port = process.env.PORT
var uri = process.env.MONGODB_URI

const debug_startup = require('debug')('startup')
debug_startup('Port:' + port + ' mode:' + mode + ' db_uri:' + uri)

// modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// to connect to database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(uri);

// routes
var index = require('./routes/index');

// initialize
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
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
