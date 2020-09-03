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
const gConfig = require('./config');

if (global.gConfig.nodeEnv !== 'production') {
  debug(`App Mode: ${global.gConfig.nodeEnv}`);
  /* log all system env variables */
  // debug(process.env);
}
//= ============================================================================
// initialize
const app = express();
debug(`App Name: ${process.env.npm_package_name}`);
debug(
  `Port:${global.gConfig.port} mode:${global.gConfig.nodeEnv} db_uri:${global.gConfig.mongodbUri} database:${global.gConfig.database}`,
);
//= ============================================================================
// middleware

// You can set morgan to log differently depending on your environment
if (global.gConfig.nodeEnv === 'development') {
  app.use(morgan('combined'));
}

// adding cookies to req headers
if (global.gConfig.cookieparserSecure) {
  debug('Cookie-parsing IS secure');
  app.use(cookieParser(global.gConfig.secret));
} else {
  debug('Cookie-parsing NOT secure');
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

// setup CORS
const { whitelist } = global.gConfig;
debug(`whitelist: ${whitelist[0]}`);
if (global.gConfig.cors === 'whitelist') {
  debug('CORS:whitelist');
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
} else if (global.gConfig.cors === 'originOnly') {
  debug(typeof whitelist[0]);
  const corsOptions = {
    origin: whitelist[0],
    optionsSuccessStatus: 200,
  }
  app.use(cors(corsOptions));
  debug('CORS:origin only');
} else if (global.gConfig.cors === 'all') {
  debug('CORS:all');
  app.use(cors());
} else {
  // this is in response to cors === 'none'
  debug('CORS:CORS not setup');
}

// force HSTS on the clients requests
if (global.gConfig.HSTS) {
  debug('Using helmet for HSTS');
  app.use(helmet());
}

// ... production mode => serve static files for React
if (global.gConfig.httpsRedirect) {
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
if (global.gConfig.nodeEnv === 'production') {
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
// import db setup function
const dbConnect = require('./modules/dbConnect');
// run function
dbConnect.Connect();
//
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
