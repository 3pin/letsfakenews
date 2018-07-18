//log all system env variables
//console.log(process.env);
//
// check the env
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  const result = dotenv.config()
  if (result.error) {
    throw result.parsed
  }
}

// modules
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// to connect to database
const uri = process.env.MONGODB_URI
const mongo = require('mongodb');
const monk = require('monk');
const db = monk(uri);

// routes
const index = require('./routes/index');

// initialize
const app = express();

//setup authorization
var auth = require("http-auth");
var digest = auth.digest({
  realm: "Private area",
  file: __dirname + "/htpasswd",
  authType: "digest"
});

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

//use authorization
app.use(function(req, res, next) {
  if ('/' === req.path) {
    next()
  } else if ('/display' === req.path) {
    (auth.connect(digest))(req, res, next)
  } else if ('/display/' === req.path) {
    (auth.connect(digest))(req, res, next)
  } else {
    next()
  }
})
/*
app.use(auth.connect(digest))
*/

// define routes
app.use('/', index);

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

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
