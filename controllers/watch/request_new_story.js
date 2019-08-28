// public routes into the app

'use strict';
const debug = require('debug')('routes_watch');
// import mongoose schemas
const Story = require('../../models/story.model');
// import middelware module to update dbSettings (entry_to_read etc)
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// module variables
let id, obj;

module.exports = (req, res) => {
  // detect client device type
  debug(req.device.type);
  if (req.device.type === 'desktop') {
    // serve story to displaypage when-previous-story-finished
    debug('/GET routes/displays/request_new_story')
    let dbSettings = req.dbSettings;
    // choose an id from activelist[]...
    let db_fetch_mode = require('../../modules/db_fetch_mode.js');
    if (dbSettings.db_mode == 'next') {
      obj = db_fetch_mode.next_entry(dbSettings.activelist, dbSettings.entry_to_read);
    } else {
      obj = db_fetch_mode.random_entry(dbSettings.activelist);
    }
    //debug(obj);
    id = obj.id;
    debug('id to read from activelist: ' + id);
    // fetch the JSON from db
    Story.findById(id, (err, data) => {
      debug(data);
      res.send({
        data: data
      });
    }).then(() => {
      // save settings to dbSettings for for next time-around
      dbSettings.entry_to_read = obj.entry_to_read;
      dbSettings.db_mode = obj.db_mode;
      dbSettingsUpdate(dbSettings).then((docs) => {
        debug('Settings for next time around: ', docs);
      })
    }).catch((err) => {
      debug("Err: ", err);
    });
  }
  else {
    debug('Mobile device attempted to access /routes/watch')
  }
}
