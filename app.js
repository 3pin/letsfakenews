// the main module of the app

// load the ENVIRONMENT variables
require('dotenv').config();
//= ============================================================================
// module debugging
const debug = require('debug')('app');

if (process.env.NODE_ENV !== 'production') {
  debug(`App Mode: ${process.env.NODE_ENV}`);
  // debug(process.env);   // log all system env variables
}
//= ============================================================================
// Module Dependencies
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const device = require('express-device');
const toBoolean = require('to-boolean');
const helmet = require('helmet');

//= ============================================================================
// initialize
const app = express();
debug(`App Name: ${process.env.npm_package_name}`);
debug(
  `Port:${process.env.PORT} mode:${process.env.NODE_ENV} db_uri:${process.env.MONGODB_URI} database:${process.env.DATABASE}`,
);
//= ============================================================================
// middleware

// You can set morgan to log differently depending on your environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// adding cookies to req headers
if (toBoolean(process.env.COOKIEPARSER_SECURE)) {
  debug('Cookies are secure');
  app.use(cookieParser(process.env.SECRET));
} else {
  debug('Cookies are NOT secure');
  app.use(cookieParser());
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// add the 'device' property to all 'req' objects to be able to detect mobile vs desktop devices
app.use(device.capture());

// cors
const cors = require('cors');

if (process.env.CORS === 'whitelist') {
  debug('CORS:whitelist');
  const whitelist = [];
  whitelist.push(process.env.WHITELIST);
  debug(`whitelist: ${whitelist}`);
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
} else if (process.env.CORS === 'all') {
  debug('CORS:all');
  app.use(cors());
} else if (process.env.CORS === 'off') {
  debug('CORS:none');
} else {
  debug('CORS:CORS not setup');
}

// force HSTS on the clients requests
if (toBoolean(process.env.HSTS)) {
  debug('Using helmet for HSTS');
  app.use(helmet());
}

// ... production mode => serve static files for React
if (toBoolean(process.env.HTTPS_REDIRECT)) {
  debug('Redirecting HTTP to HTTPS');
  app.use((req, res, next) => {
    const reqType = req.headers['x-forwarded-proto'];
    reqType === 'https'
      ? next()
      : res.redirect(`https://${req.headers.host}${req.url}`);
  });
} else {
  debug('NOT redirecting HTTP to HTTPS');
}

// ... production mode => serve static files for React
if (process.env.NODE_ENV === 'production') {
  debug(`Serving: ${__dirname}/client/build/index.html`);
  app.use(express.static(`${__dirname}/client/build`));
  app.use(favicon(path.join(__dirname, '/client/build', 'favicon.ico')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
} else {
  debug(`Serving: ${__dirname}/client/public/index.html`);
  app.use(express.static(`${__dirname}/client/public`));
  app.use(favicon(path.join(__dirname, '/client/public', 'favicon.ico')));
  // app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
  app.get('/', (req, res) => {
    debug(req);
    res.sendFile(path.join(__dirname, '/client/public/index.html'));
  });
}

// Make our db accessible to our router
const mongoose = require('mongoose');

const db = mongoose.connection;
app.use((req, res, next) => {
  req.db = db;
  next();
});

// fetch dbSettings from db
const dbSettingsFetch = require('./controllers/middleware/dbSettingsFetch');

app.use(dbSettingsFetch);
//= ============================================================================
// define that all routes are within the 'routes' folder
const index = require('./routes/index');

app.use('/', index);

//= ============================================================================
// Error Handlers
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  // provides error reporting in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  // res.send('error: ', err);
  res.status(err.status || 500).send(err.message);
  next();
});
//= ============================================================================
// DB setup
// schemas
const Auth = require('./models/auth.model');
const Settings = require('./models/settings.model');

const settingsObj = {
  entryToRead: parseInt(process.env.ENTRY_TO_READ, 10),
  autolive: toBoolean(process.env.AUTOLIVE),
  activelist: [],
  dbMode: process.env.DB_MODE,
  node_mode: process.env.NODE_ENV,
  visualise: process.env.VISUALISE,
  image_duration: process.env.IMAGE_DURATION,
  text_scrollers: process.env.TEXT_SCROLLERS,
};
const authObj = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options, (err, client) => {
  if (err) {
    debug('error coming...');
    debug(err);
  }
  // readystate: 0=disconnect 1=connected 2=conecting 3=disconnecting
  debug(`Db connection state: ${mongoose.connection.readyState}`);
  if (mongoose.connection.readyState === 0) {
    debug('Cannot connect to specified database');
  } else {
    // check for existing collections
    client.db.listCollections().toArray((error, collections) => {
      // if there are no collections existing...
      if (collections.length === 0) {
        debug(
          `No collections exist... creating database: ${process.env.DATABASE}`,
        );
        // create a user-entry for authorisation to backend...
        const auth = new Auth(authObj);
        auth.save().then((doc) => {
          debug(doc);
        });
        // create a settings-entry
        const settings = new Settings(settingsObj);
        settings.save().then((res) => {
          debug(res);
        });
      } else {
        // else for exiting collections...
        for (const [i, value] of collections.entries()) {
          // debug(value.name);
          // if there is a collection matching the current project...
          if (value.name === process.env.DATABASE) {
            debug(
              `Collection already exists... updating database: ${process.env.DATABASE}`,
            );
            // replace default user entry
            Auth.deleteOne({}).then(() => {
              const auth = new Auth(authObj);
              auth.save().then((doc) => {
                debug('Auth Entry: ', doc);
              });
            });
            Settings.find({}).then((result) => {
              debug('current dbSettings are...');
              debug(result);
              const settings = new Settings(result[0]);
              /* load NODE_ENV (development/production) from .env into db into */
              settings.node_mode = process.env.NODE_ENV;
              settings.save().then((res) => {
                debug('updated dbSettings are...');
                debug(res);
              });
            });
            break;
          } else if (i === collections.length - 1) {
            // if there is no matching collection...
            debug(
              `Existing collections dont match current project... creating database: ${process.env.DATABASE}`,
            );
            const settings = new Settings(settingsObj);
            settings.save().then((res) => {
              debug(res);
            });
            const auth = new Auth(authObj);
            auth.save().then((res) => {
              debug(res);
            });
            break;
          }
        }
      }
      debug(error);
    });
  }
});
db.on('connected', () => {
  debug('Connected to mongoDB.');
});
db.on('open', () => {
  debug('Opened mongoDB');
});
db.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
db.on('error', (err) => {
  debug(err);
});
//= ============================================================================
module.exports = app;
