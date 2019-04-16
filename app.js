// the main module of the app
'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
//=============================================================================
// module debugging
const debug = require('debug')('app');
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
  path = require('path'),
  device = require('express-device');

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
debug(`App Name: ${process.env.npm_package_name}`);
debug(`Port:${process.env.PORT} mode:${process.env.NODE_ENV} db_uri:${process.env.MONGODB_URI} database:${process.env.DATABASE}`);
//=============================================================================
// configuration
//app.set('views', path.join(__dirname, 'views'));
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
//add the 'device' property to all 'req' objects
app.use(device.capture());

//cors
const cors = require('cors');
const whitelist = [process.env.WHITELIST_LOCAL, process.env.WHITELIST_REMOTE]
const corsOption_whitelist = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    debug(req.header('Origin'));
    // reflect (enable) the requested origin in the CORS response
    corsOptions = {
      origin: true,
      credentials: true,
    }
  } else {
    // disable CORS for this request
    corsOptions = {
      origin: false,
      credentials: false
    }
  }
  // callback expects two parameters: error and options
  callback(null, corsOptions)
}
app.use(cors(corsOption_whitelist));

// ... production mode => serve static files for React
if (process.env.NODE_ENV === 'production') {
  console.log('Serving: ' + __dirname + '/client/build/index.html');
  app.use(express.static(__dirname + '/client/build'));
  //
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  })

}
// ... local mode
else {
  debug('Serving: ' + __dirname + '/client/public/index.html');
  app.use(express.static(__dirname + '/client/public'));
  //app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
  //
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/index.html'));
  })
}

// Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});

// fetch dbSettings from db
const dbSettingsFetch = require('./controllers/middleware/dbSettingsFetch');
app.use(dbSettingsFetch);
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
mongoose.connect(process.env.MONGODB_URI, options, function (err, client) {
  if (err) {
    debug(err);
  }
  // check for existing collections
  client.db.listCollections().toArray((err, collections) => {
    //debug(collections);
    // schemas
    const Auth = require('./models/auth.model');
    const Settings = require('./models/settings.model');
    let settingsObj = {
      entry_to_read: parseInt(process.env.ENTRY_TO_READ),
      autolive: Boolean(process.env.AUTOLIVE),
      activelist: [],
      db_mode: process.env.DB_MODE,
      node_mode: process.env.NODE_ENV,
    }
    let authObj = {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }
    // if there are no collections existing...
    if (collections.length === 0) {
      debug(`No collections exist... creating database: ${process.env.DATABASE}`);
      // create a user-entry for authorisation to backend...
      let auth = new Auth(authObj);
      auth.save().then((doc) => {
        debug(doc);
      });
      // create a settings-entry
      let settings = new Settings(settingsObj);
      settings.save().then((res) => {
        debug(res);
      });
    }
    // else for exiting collections...
    else {
      for (const [index, value] of collections.entries()) {
        //debug(value.name);
        // if there is a collection matching the current project...
        if (value.name === process.env.DATABASE) {
          debug(`Collection already exists... updating database: ${process.env.DATABASE}`);
          //replace default user entry
          Auth.deleteOne({}).then(() => {
            let auth = new Auth(authObj);
            auth.save().then((doc) => {
              debug("Auth Entry: ", doc);
            });
          })
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
              const dbSettingsUpdate = require('./controllers/middleware/dbSettingsUpdate');
              dbSettingsUpdate(settingsObj).then((res) => {
                debug(res);
              });
            });
          break;
        }
        // if there is no matching collection...
        else if (index === collections.length - 1) {
          debug(`Existing colections dont match current project... creating database: ${process.env.DATABASE}`);
          let settings = new Settings(settingsObj);
          settings.save().then((res) => {
            debug(res);
          });
          let auth = new Auth(authObj);
          auth.save().then((res) => {
            debug(res);
          });
          break;
        }
      }
    }
  });
});
//=============================================================================

module.exports = app;
