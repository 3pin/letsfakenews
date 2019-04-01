// public routes into the app

'use strict';
const debug = require('debug')('routes_watch');
// import mongoose schemas
const Story = require('../../models/story.model');
// module variable to hold the id to read from the db
let id;

module.exports = (req, res) => {
  // serve story to displaypage when-previous-story-finished
  debug('/GET routes/displays/request_new_story')
  let dbSettings = req.dbSettings;
  // choose an id from activelist[]...
  let db_fetch_mode = require('../../modules/db_fetch_mode.js');
  let obj;
  if (dbSettings.db_mode == 'next') {
    obj = db_fetch_mode.next_entry(dbSettings.activelist, dbSettings.entry_to_read);
    // set global vars for next-sequential-time-around
    dbSettings.entry_to_read = obj.entry_to_read;
    debug(obj.entry_to_read);
  } else {
    obj = db_fetch_mode.random_entry(dbSettings.activelist);
  }
  dbSettings.db_mode = obj.db_mode;
  debug(dbSettings.db_mode);
  id = obj.id;
  debug('id to read from activelist: ' + id);
  // fetch the JSON from db
  debug('fetching the obj from db');
  Story.findById(id, (err, data) => {
    debug(data);
    res.send({
      data: data
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
