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
// configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//=============================================================================
// middleware

app.use(logger('dev'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(favicon(path.join('../client', 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Serve static files from the React app
// ... production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //app.get('*', (req, res) => {res.sendfile(path.join(__dirname = 'client/build/index.html'));})
}
// ... local mode
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

// fetch dbSettings from db
/*
const dbSettingsFetch = require('./controllers/settings/dbSettingsFetch');
app.use(dbSettingsFetch);
*/
app.use(function (req,res,next) {
  debug("Entered app-level middleware");
  const Settings = require('./models/settings.model');
  // import mongoose schemas
  Settings.find({}).then((data) => {
    debug(data[0]);
    req.dbSettings = data[0];
    next();
  }).catch(function (err) {
    res.status(500).end();
    next(err);
  })
})
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
  // check for existing collections
  client.db.listCollections().toArray((err, collections) => {
    debug(collections);
    // settings schema
    const Base = require('./models/base.model');
    const Settings = require('./models/settings.model');
    let settingsObj = {
      entry_to_read: parseInt(process.env.ENTRY_TO_READ),
      autolive: Boolean(process.env.AUTOLIVE),
      activelist: [],
      db_mode: process.env.DB_MODE
    }
    // if there are no collections existing...
    if (collections.length === 0) {
      debug('No collections exist... creating a settings entry');
      let settings = new Settings({ ...settingsObj});
      settings.save().then((res) => {
        debug(res);
      });
    }
    // else for collectsion that exist...
    else {
      for (const [index, value] of collections.entries()) {
        debug(value.name);
        // if there is a collection matching the current project...
        if (value.name === process.env.DATABASE) {
          debug('Collection already exists... updating existing settings entry');
          // load _ids of all live-stories into activelist[]
          let activelist = [];
          const Story = require('./models/story.model');
          Story.find({}, {
              storylive: true
            }, function (e, docs) {
              docs.forEach((entry) => {
                if (entry.storylive === true) {
                  activelist.push(entry._id);
                }
              });
            })
            .then(() => {
              settingsObj.activelist = activelist;
              debug(settingsObj.activelist);
              Settings.findOneAndUpdate({}, { $set: { activelist: settingsObj.activelist }}, {new: false})
                .then((res) => {
                  debug('app response');
                  debug(res);
                });

            });
            break;
        }
        // if there is no matching collection...
        else if (index === collections.length - 1) {
          debug('Existing colections dont match current project... creating a settings entry');
          let settingsObj = {
            entry_to_read: process.env.ENTRY_TO_READ,
            autolive: process.env.AUTOLIVE,
            activelist: [],
            db_mode: process.env.DB_MODE
          }
          let settings = new Settings({settingsObj});
          settings.save().then((res) => {
            debug(res);
          });
          break;
        }
      }
    }
  });
});
let db = mongoose.connection;
db.on('connected', function (ref) {
  debug("Connected to mongoDB.");
});
db.on('open', function (ref) {
  debug("Opened mongoDB");
});
db.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
db.on('error', console.error.bind(console, 'connection error:'));
//=============================================================================

module.exports = app;
