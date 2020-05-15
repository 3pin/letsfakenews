// public routes into the app

const debug = require('debug')('routes');
// import mongoose schemas
const Story = require('../../models/story.model');
// import middelware module to update dbSettings (entryToRead etc)
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
const dbFetchMode = require('../../modules/dbFetchMode.js');

module.exports = (req, res) => {
  debug('/routes/watch/requestNewStory');
  // detect client device type
  if (req.device.type === 'desktop') {
    debug('/GET routes/displays/request_new_story');
    const { dbSettings } = req;
    const { room } = req.query;
    let obj;
    // choose an id from activelist[]...
    if (dbSettings.dbMode === 'next') {
      obj = dbFetchMode.nextEntry(dbSettings.activelist, dbSettings.entryToRead);
    } else {
      obj = dbFetchMode.randomEntry(dbSettings.activelist);
    }
    const { id } = obj;
    debug(`id to read from activelist: ${id}`);
    // fetch the JSON from db
    Story.findById(id, (err, data) => {
      debug(data);
      res.send(data);
    }).then(() => {
      // save settings to dbSettings for for next time-around
      dbSettings.entryToRead = obj.entryToRead;
      dbSettings.dbMode = obj.dbMode;
      dbSettingsUpdate(dbSettings, room).then((docs) => {
        debug('Settings for next time around: ', docs);
      });
    }).catch((err) => {
      debug('Err: ', err);
    });
  } else {
    debug('Mobile device attempted to access /routes/watch');
  }
};
