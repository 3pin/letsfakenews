"use strict";

// load the ENVIRONMENT variables
require("dotenv").config();
const debug = require("debug")("tests");
// load assertion library
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();
// db-connection
const toBoolean = require("to-boolean");
const settingsObj = {
  entry_to_read: parseInt(process.env.ENTRY_TO_READ),
  autolive: toBoolean(process.env.AUTOLIVE),
  activelist: [],
  db_mode: process.env.DB_MODE,
  node_mode: process.env.NODE_ENV,
  visualise: process.env.VISUALISE
};
const authObj = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false,
  useUnifiedTopology: true
};
const mongoose = require("mongoose");
const refresh_save_urls = require("../../modules/refresh_save_urls.js");
let activelist = [];
//
//
before(function(done) {
  const Auth = require("../../models/auth.model");
  const Settings = require("../../models/settings.model");
  let auth = new Auth(authObj);
  let settings = new Settings(settingsObj);
  mongoose.connect(process.env.MONGODB_URI, options, function(err, client) {
    if (err) {
      debug(err);
    }
    //readystate: 0=disconnect 1=connected 2=conecting 3=disconnecting
    debug(`Db connection state: ${mongoose.connection.readyState}`);
    if (mongoose.connection.readyState === 0) {
      debug("Cannot connect to specified database");
      done();
    } else {
      // check for existing collections
      client.db.listCollections().toArray((err, collections) => {
        // if there are no collections existing...
        if (collections.length === 0) {
          debug(
            `No collections exist... creating database: ${process.env.DATABASE}`
          );
          // create a user-entry for authorisation to backend...
          //let auth = new Auth(authObj);
          //let settings = new Settings(settingsObj);
          auth
            .save()
            .then(doc => {
              debug(doc);
            })
            .then(() => {
              // create a settings-entry
              settings.save().then(res => {
                debug(res);
              });
            })
            .then(() => {
              done();
            });
        }
        // else for exiting collections...
        else {
          for (const [index, value] of collections.entries()) {
            // if there is a collection matching the current project...
            if (value.name === process.env.DATABASE) {
              debug(
                `Collection already exists... updating database: ${process.env.DATABASE}`
              );
              const Settings = require("../../models/settings.model");
              Auth.deleteOne({}).then(() => {
                //replace default user entry
                //let auth = new Auth(authObj);
                auth
                  .save()
                  .then(doc => {
                    debug("Auth Entry: ", doc);
                  })
                  .then(() => {
                    //load activelist from dbSettings into activelist
                    Settings.find({})
                      .then(result => {
                        activelist = result[0].activelist;
                        debug(activelist);
                      })
                      .then(() => {
                        done();
                      });
                  });
              });
              break;
            }
            // if there is no matching collection...
            else if (index === collections.length - 1) {
              debug(
                `Existing collections dont match current project... creating database: ${process.env.DATABASE}`
              );
              //let settings = new Settings(settingsObj);
              //let auth = new Auth(authObj);
              settings
                .save()
                .then(res => {
                  debug(res);
                })
                .then(() => {
                  auth.save().then(res => {
                    debug(res);
                  });
                })
                .then(() => {
                  done();
                });
              break;
            }
          }
        }
      });
    }
  });
});
//
describe("Refresh the urls in one story", () => {
  //
  it("fetch nouns from Obj...match nouns with urls...update Obj...update Database", done => {
    let id = activelist[0];
    debug(id);
    /*
    let obj = {
      words: ["thursday", "friday"],
      urls: [
        "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg",
        "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg"
      ]
    };
    */
    refresh_save_urls
      .process(id)
      .then(text => {
        expect(text).to.equal("Story_Updated");
      })
      .then(() => {
        done();
        after(done => {
          mongoose.connection.close(() => {
            process.exit(0);
          });
        });
      });
  });
});
