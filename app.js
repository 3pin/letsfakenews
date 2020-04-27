/* the main module of the app */

//= ============================================================================
// Module Dependencies
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const device = require('express-device');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

//= ============================================================================
/* load the ENVIRONMENT variables for debug */
require('dotenv').config();
const debug = require('debug')('app');

/* load global config */
const config = require('./config');

if (global.config.nodeEnv !== 'production') {
  debug(`App Mode: ${global.config.nodeEnv}`);
  /* log all system env variables */
  // debug(process.env);
}
//= ============================================================================
// initialize
const app = express();
debug(`App Name: ${process.env.npm_package_name}`);
debug(
  `Port:${global.config.port} mode:${global.config.nodeEnv} db_uri:${global.config.mongodbUri} database:${global.config.DATABASE}`,
);
//= ============================================================================
// middleware

// You can set morgan to log differently depending on your environment
if (global.config.nodeEnv === 'development') {
  app.use(morgan('combined'));
}

// adding cookies to req headers
if (global.config.cookieparserSecure) {
  debug('Cookies are secure');
  app.use(cookieParser(global.config.secret));
} else {
  debug('Cookies are NOT secure');
  app.use(cookieParser());
}

/* populate the req.body param accordingly */
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// add the 'device' property to all 'req' objects to be able to detect mobile vs desktop devices
app.use(device.capture());

if (global.config.cors === 'whitelist') {
  debug('CORS:whitelist');
  const whitelist = [];
  whitelist.push(global.config.whitelist);
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
} else if (global.config.cors === 'all') {
  debug('CORS:all');
  app.use(cors());
} else if (global.config.cors === 'off') {
  debug('CORS:none');
} else {
  // this is in response to cors === 'none'
  debug('CORS:CORS not setup');
}

// force HSTS on the clients requests
if (global.config.HSTS) {
  debug('Using helmet for HSTS');
  app.use(helmet());
}

// ... production mode => serve static files for React
if (global.config.httpsRedirect) {
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
if (global.config.nodeEnv === 'production') {
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
  entryToRead: parseInt(global.config.entryToRead, 10),
  autolive: global.config.autolive,
  activelist: [],
  dbMode: global.config.dbMode,
  nodeMode: global.config.nodeEnv,
  visualise: global.config.visualise,
  imageDuration: global.config.imageDuration,
  textScrollers: global.config.textScrollers,
};
const authObj = {
  username: global.config.username,
  password: global.config.password,
};
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(global.config.mongodbUri, options, (err, client) => {
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
          `No collections exist... creating database: ${global.config.database}`,
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
          if (value.name === global.config.database) {
            debug(
              `Collection already exists... updating database: ${global.config.database}`,
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
              settings.nodeMode = global.config.nodeEnv;
              settings.save().then((res) => {
                debug('updated dbSettings are...');
                debug(res);
              });
            });
            break;
          } else if (i === collections.length - 1) {
            // if there is no matching collection...
            debug(
              `Existing collections dont match current project... creating database: ${global.config.database}`,
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
