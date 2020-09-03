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
  entryToRead: parseInt(global.gConfig.entryToRead, 10),
  autolive: global.gConfig.autolive,
  activelist: [],
  dbMode: global.gConfig.dbMode,
  nodeMode: global.gConfig.nodeEnv,
  visualise: global.gConfig.visualise,
  imageDuration: global.gConfig.imageDuration,
  textScrollers: global.gConfig.textScrollers,
};
const authObj = {
  username: global.gConfig.username,
  password: global.gConfig.password,
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
  mongoose.connect(global.gConfig.mongodbUri, options, (err) => {
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
      mongoose.connection.db.listCollections().toArray((error, collections) => {
        if (error) {
          debug('error coming...');
          debug(err);
        }
        // if there are no collections existing...
        if (collections.length === 0) {
          debug(
            `No db exists... creating database: ${global.gConfig.database}`,
          );
          for (let i = 0; i < global.gConfig.roomSetup.rooms.length; i += 1) {
            // create a user-entry for authorisation to backend...
            const authObj = {
              room: global.gConfig.roomSetup.rooms[i],
              username: global.gConfig.roomSetup.usernames[i],
              password: global.gConfig.roomSetup.passwords[i],
            };
            const auth = new Auth(authObj);
            auth.save().then((doc) => {
              debug(doc);
            });
            // create a settings-entry
            const settingsObj = {
              entryToRead: parseInt(global.gConfig.entryToRead, 10),
              autolive: global.gConfig.autolive,
              activelist: [],
              dbMode: global.gConfig.dbMode,
              nodeMode: global.gConfig.nodeEnv,
              corsAnywhere: global.gConfig.corsAnywhere,
              visualise: global.gConfig.visualise,
              imageDuration: global.gConfig.imageDuration,
              textScrollers: global.gConfig.textScrollers,
              room: global.gConfig.roomSetup.rooms[i],
            };
            const settings = new Settings(settingsObj);
            settings.save().then((res) => {
              debug(res);
            });
          }
        } else {
          // else for exiting collections...
          for (let index = 0; index < collections.length; index += 1) {
            debug(`CollectionName:${collections[index].name} @index:${index}`);
            if (collections[index].name === global.gConfig.database) {
              debug('Collection already exists, so loading...');
              break;
            } else if (index === collections.length - 1) {
              for (let i = 0; i < global.gConfig.roomSetup.rooms.length; i += 1) {
                debug('No collection exists, creating a new collection...');
                // create a user-entry for authorisation to backend...
                const authObj = {
                  room: global.gConfig.roomSetup.rooms[i],
                  username: global.gConfig.roomSetup.usernames[i],
                  password: global.gConfig.roomSetup.passwords[i],
                };
                const auth = new Auth(authObj);
                auth.save().then((doc) => {
                  debug(doc);
                });
                // create a settings-entry
                const settingsObj = {
                  entryToRead: parseInt(global.gConfig.entryToRead, 10),
                  autolive: global.gConfig.autolive,
                  activelist: [],
                  dbMode: global.gConfig.dbMode,
                  nodeMode: global.gConfig.nodeEnv,
                  visualise: global.gConfig.visualise,
                  imageDuration: global.gConfig.imageDuration,
                  textScrollers: global.gConfig.textScrollers,
                  room: global.gConfig.roomSetup.rooms[i],
                  corsAnywhere: global.gConfig.corsAnywhere,
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
