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
app.locals.entry_to_read = 0; // id_to_read from above array
app.locals.autolive = JSON.parse(process.env.AUTOLIVE); // sets whether new-stories auto-display on main-screen or not
app.locals.activelist = []; // list of active stories for display
app.locals.db_mode = 'next';
app.locals.createDB = false;
app.locals.dbId = '0';
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

// Serve static files from the React app
// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
// dev mode
else {
  app.use(express.static(path.join(__dirname, 'client/public')));
}
//local mode
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})
*/

// Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});

/*
var middleware = {
  globalLocals: function (req, res, next) {
    res.locals({
      dbId: dbId
    });
    next();
  }
};
app.use(middleware.globalLocals);
*/

//=============================================================================
// define that all routes are within the 'routes' folder
app.use('/', write);
app.use('/watch', watch);
app.use('/admin', admin);
app.use('/settings', settings);
//=============================================================================
// Error Handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  // provides error reporting in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//=============================================================================
// DB setup
const mongoose = require('mongoose');
// Schemas
const Master = require('./models/master.model');
const master = new Master();
// Connect and check is existing collection... else create new collection
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false
};
mongoose.connect(process.env.MONGODB_URI, options, function (err, client) {
  if (err) {
    debug(err);
  }
});
let db = mongoose.connection;
db.on('connected', function (ref) {
  debug("Connected to mongoDB.");
});
db.on('open', function (ref) {
  // All OK - fire (emit) a ready event.
  app.emit('ready');
  // import mongoose schemas
  const Story = require('./models/story.model');
  Story.find({}, {
    storylive: true
  }, function (e, docs) {
    docs.forEach((entry) => {
      if (entry.storylive === true) {
        app.locals.activelist.push(entry._id);
      }
    });
    debug(`Activelist loaded: ${app.locals.activelist}`);
  });
});
db.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
db.on('error', console.error.bind(console, 'connection error:'));
//=============================================================================

module.exports = app;
