const mongoose = require('mongoose');

//= ============================================================================
/* load the ENVIRONMENT variables for debug */
require('dotenv').config();

const debug = require('debug')('dbConnect');

// schemas
const Auth = require('../models/auth.model');
const Settings = require('../models/settings.model');

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

function Connect() {
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
        if (error) {
          debug('error coming...');
          debug(err);
        }
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
      });
    }
  });
}
module.exports.Connect = Connect;
