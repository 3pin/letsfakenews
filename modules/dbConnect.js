const mongoose = require('mongoose');

//= ============================================================================
/* load the ENVIRONMENT variables for debug */
// require('dotenv').config();

const debug = require('debug')('dbConnect');

// schemas
const Auth = require('../models/auth.model');
const Settings = require('../models/settings.model');
/*
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
*/
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
            `No db exists... creating database: ${global.config.database}`,
          );
          for (let i = 0; i < global.config.roomSetup.rooms.length; i += 1) {
            // create a user-entry for authorisation to backend...
            const authObj = {
              room: global.config.roomSetup.rooms[i],
              username: global.config.roomSetup.usernames[i],
              password: global.config.roomSetup.passwords[i],
            };
            const auth = new Auth(authObj);
            auth.save().then((doc) => {
              debug(doc);
            });
            // create a settings-entry
            const settingsObj = {
              entryToRead: parseInt(global.config.entryToRead, 10),
              autolive: global.config.autolive,
              activelist: [],
              dbMode: global.config.dbMode,
              nodeMode: global.config.nodeEnv,
              visualise: global.config.visualise,
              imageDuration: global.config.imageDuration,
              textScrollers: global.config.textScrollers,
              room: global.config.roomSetup.rooms[i],
            };
            const settings = new Settings(settingsObj);
            settings.save().then((res) => {
              debug(res);
            });
          }
        } else {
          // else for exiting collections...
          for (let index = 0; index < collections.length; index += 1) {
            debug(`CollectionName:${collections[index].name}`);
            if (collections[index].name === global.config.database) {
              debug('Collection already exists, so loading...');
              break;
            } else if (index === collections.length - 1) {
              for (let i = 0; i < global.config.roomSetup.rooms.length; i += 1) {
                // create a user-entry for authorisation to backend...
                const authObj = {
                  room: global.config.roomSetup.rooms[i],
                  username: global.config.roomSetup.usernames[i],
                  password: global.config.roomSetup.passwords[i],
                };
                const auth = new Auth(authObj);
                auth.save().then((doc) => {
                  debug(doc);
                });
                // create a settings-entry
                const settingsObj = {
                  entryToRead: parseInt(global.config.entryToRead, 10),
                  autolive: global.config.autolive,
                  activelist: [],
                  dbMode: global.config.dbMode,
                  nodeMode: global.config.nodeEnv,
                  visualise: global.config.visualise,
                  imageDuration: global.config.imageDuration,
                  textScrollers: global.config.textScrollers,
                  room: global.config.roomSetup.rooms[i],
                };
                const settings = new Settings(settingsObj);
                settings.save().then((res) => {
                  debug(res);
                });
              }
            } else {
              debug('Encountered a different collection in the db, so skiping... ');
            }
          }
        }
      });
    }
  });
}
module.exports.Connect = Connect;
