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
  //favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  path = require('path')
//=============================================================================
// mongoose DB connection
const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
let gate = false;
db.on('open', function () {
  db.db.listCollections().toArray(function (err, collectionNames) {
    if (err) {
      debug(err);
      return;
    }
    debug(collectionNames);
    debug(collectionNames.length);
    if (collectionNames.length === 0) {
      gate = true;
      debug(`gate: ${gate}`);
      // check / create mongoose 'Master' schema
      const Master = require('./models/master.model');
      const master = new Master();
      debug('boom')
      master.save().then((result) => {
        debug('Master Database Schema created');
        debug(result);
        app.locals.dbId = result._id;
      }).catch((err) => {
        debug("Err: ", err);
      });
    }
    db.close();
  });
});

/*
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// check / create mongoose 'Master' schema
const Master = require('./models/master.model');
const master = new Master();
master.save().then((result) => {
  debug('Master Database Schema created');
  debug(result);
  app.locals.dbId = result._id;
}).catch((err) => {
  debug("Err: ", err);
});
*/
/*
// auth
const auth = require("http-auth");
const digest = auth.digest({
    realm: "Private area",
    file: "./htpasswd",
    authType: "digest"
  });
function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  return next();
}
*/

//=============================================================================
// routes structure
const write = require('./routes/write');
const admin = require('./routes/admin');
const watch = require('./routes/watch');
const settings = require('./routes/settings');

//=============================================================================
// initialize
const app = express();
debug('App Name: ' + process.env.npm_package_name)
debug('Port:' + process.env.PORT + ' mode:' + process.env.NODE_ENV + ' db_uri:' + process.env.MONGODB_URI + ' db_collection:' + process.env.DB_STORIES + ' db_feedback:' + process.env.DB_FEEDBACK);
//=============================================================================
// module variables
app.locals.entry_to_read = 0;        // id_to_read from above array
app.locals.autolive = JSON.parse(process.env.AUTOLIVE);      // sets whether new-stories auto-display on main-screen or not
app.locals.activelist = [];       // list of active stories for display
app.locals.db_mode = 'next';
//=============================================================================
// configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//=============================================================================
// middleware
app.use(logger('dev'));
/*
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(path.join('../client', 'public', 'favicon.ico')));
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// condense the visible URL address in a client's browser
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join('../client', 'public')));

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});
//=============================================================================
// define that all routes are within the 'routes' folder
app.use('/', write);
app.use('/watch', watch);
app.use('/admin', admin);
app.use('/settings', settings);
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
