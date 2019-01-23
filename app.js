// the main module of the app
'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
//=============================================================================
// module debugging
const debug = require('debug')('app')
if (process.env.NODE_ENV !== 'production') {
  debug('App Mode: ' + process.env.NODE_ENV);
  //debug(process.env);   // log all system env variables
}
//=============================================================================
// Module Dependencies
const
  express = require('express'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  path = require('path'),
  // to connect to database
  monk = require('monk'),
  db = monk(process.env.MONGODB_URI),
  // auth
  auth = require("http-auth"),
  digest = auth.digest({
    realm: "Private area",
    file: "./htpasswd",
    authType: "digest"
  });
function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  //return next()
}
//=============================================================================
// routes file
const routes = require('./routes');
//=============================================================================
// initialize
const app = express();
debug('App Name: ' + process.env.npm_package_name)
debug('Port:' + process.env.PORT + ' mode:' + process.env.NODE_ENV + ' db_uri:' + process.env.MONGODB_URI + ' db_collection:' + process.env.COLLECTION + ' db_feedback:' + process.env.FEEDBACK);
//=============================================================================
// module variables
app.locals.db_mode = 'new_story'; // declare the db-read-mode: old_story || new_story
app.locals.id_to_read = 0;        // id_to_read from above array
//=============================================================================
// configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//=============================================================================
// middleware
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // uncomment after placing your favicon in /public
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
//=============================================================================
// define routes
app.use('/', routes);
//=============================================================================
// Event Handlers
/*
app.on('getRoot', renderHandlers.root);
app.on('getLogin', renderHandlers.login);
app.on('failedLogin', renderHandlers.failedLogin);
app.on('getSignup', renderHandlers.signup);
app.on('failedSignup', renderHandlers.failedSignup);
app.on('getDashboard', renderHandlers.dashboard);
*/
//=============================================================================
// Error Handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  // provides error reporting in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//=============================================================================
module.exports = app;
