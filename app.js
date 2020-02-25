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
  favicon = require('serve-favicon'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  path = require('path'),
  device = require('express-device'),
  toBoolean = require('to-boolean'),
  helmet = require("helmet");

//=============================================================================
// initialize
const app = express();
debug(`App Name: ${process.env.npm_package_name}`);
debug(`Port:${process.env.PORT} mode:${process.env.NODE_ENV} db_uri:${process.env.MONGODB_URI} database:${process.env.DATABASE}`);
//=============================================================================
// middleware

// You can set morgan to log differently depending on your environment
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('combined'));
}

// adding cookies to req headers
if (toBoolean(process.env.COOKIEPARSER_SECURE)) {
  debug('Cookies are secure')
  app.use(cookieParser(process.env.SECRET));
} else {
  debug('Cookies are NOT secure')
  app.use(cookieParser());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//add the 'device' property to all 'req' objects to be able to detect mobile vs desktop devices
app.use(device.capture());

//cors

/*
app.all('*', function(req, res, next) {
     var origin = req.get('origin');
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});
*/

/*
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
*/

if (process.env.CORS === 'whitelist') {
  debug('CORS:whitelist')
  const cors = require('cors');
  var whitelist = []
  whitelist.push(process.env.WHITELIST)
  debug('whitelist: ' + whitelist);
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.use(cors(corsOptions));
} else if (process.env.CORS === 'all') {
  debug('CORS:all')
  const cors = require('cors');
  app.use(cors());
} else if (process.env.CORS === 'off')  {
  debug('CORS:none')
} else {
  debug('CORS:CORS not setup')
}

// force HSTS on the clients requests
if (toBoolean(process.env.HSTS)) {
  debug('Using helmet for HSTS')
  app.use(helmet());
}

// ... production mode => serve static files for React
if (toBoolean(process.env.HTTPS_REDIRECT)) {
  debug('Redirecting HTTP to HTTPS')
  app.use(function (req, res, next) {
    var reqType = req.headers["x-forwarded-proto"];
    reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
} else {
  debug('NOT redirecting HTTP to HTTPS')
}

// ... production mode => serve static files for React
if (process.env.NODE_ENV === 'production') {
  console.log('Serving: ' + __dirname + '/client/build/index.html');
  app.use(express.static(__dirname + '/client/build'));
  app.use(favicon(path.join(__dirname, '/client/build', 'favicon.ico')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  })
} else {
  debug('Serving: ' + __dirname + '/client/public/index.html');
  app.use(express.static(__dirname + '/client/public'));
  app.use(favicon(path.join(__dirname, '/client/public', 'favicon.ico')));
  //app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
  app.get('/', (req, res) => {
    debug(req)
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
const index = require('./routes/index');
app.use('/', index);

//=============================================================================
// Error Handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  // provides error reporting in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  //res.send('error: ', err);
  res.status(err.status || 500).send(err.message)
});
//=============================================================================
// DB setup
// schemas
const Auth = require('./models/auth.model');
const Settings = require('./models/settings.model');
const settingsObj = {
  entry_to_read: parseInt(process.env.ENTRY_TO_READ),
  autolive: toBoolean(process.env.AUTOLIVE),
  activelist: [],
  db_mode: process.env.DB_MODE,
  node_mode: process.env.NODE_ENV,
  visualise: process.env.VISUALISE,
  image_duration: process.env.IMAGE_DURATION,
  text_scrollers: process.env.TEXT_SCROLLERS
}
const authObj = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
}
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false,
  useUnifiedTopology: true
};
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, options, function (err, client) {
  if (err) {
    debug('error coming...')
    debug(err);
  }
  //readystate: 0=disconnect 1=connected 2=conecting 3=disconnecting
  debug(`Db connection state: ${mongoose.connection.readyState}`);
  if (mongoose.connection.readyState === 0) {
    debug('Cannot connect to specified database');
  } else {
    // check for existing collections
    client.db.listCollections().toArray((err, collections) => {
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
            //load activelist from dbSettings into activelist
            let activelist = [];
            const Settings = require('./models/settings.model');
            Settings.find({}).then((result) => {
              debug('current dbSettings are...');
              debug(result);
              activelist = result[0].activelist;
              /* load NODE_ENV (development/production) from .env into db into */
              debug(result[0].node_mode);
              result[0].node_mode = process.env.NODE_ENV;
              debug(result[0].node_mode);
              let settings = new Settings(result[0]);
              settings.save().then((res) => {
                debug('updated dbSettings are...');
                debug(res);
              });
            })
            break;
          }
          // if there is no matching collection...
          else if (index === collections.length - 1) {
            debug(`Existing collections dont match current project... creating database: ${process.env.DATABASE}`);
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
  }
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
