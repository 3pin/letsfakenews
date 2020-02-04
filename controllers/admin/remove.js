'use strict';

const debug = require('debug')('routes_admin');
// load update module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');
// import mongoose 'Auth' schema
const Settings = require('../../models/settings.model');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  debug('/routes/story/remove');
  // remove entry from activevisualiselist in dB
  let dbSettings = req.dbSettings;
  debug(dbSettings.activelist);
  dbSettings.activelist = dbSettings.activelist.filter(item => item != req.body._id);
  debug(dbSettings.activelist);
  // offset the next-story-to-read to account for deleted entry
  dbSettings.entry_to_read = dbSettings.entry_to_read - 1;
  dbSettingsUpdate(dbSettings).then((docs) => {
    debug(docs);
  })
  // delete entry from acreq.tual db
  const query = {
    _id: req.body._id
  };
  debug(req.body._id);
  Story.findOneAndDelete(query).then((docs, err) => {
    debug(docs);
  }).then(() => {
    // fetch the db to refresh the frontend
    Story.find({}).sort([['_id', 1]]).then((docs, err) => {
      debug(docs);
      /* tell visualise-pages about activeListChange */
      bus.emit('activelistChange', dbSettings.activelist.length);
      /* check if activelist.length < visualise.length */
      if (dbSettings.activelist.length <= dbSettings.visualise) {
        debug(`activelist:${dbSettings.activelist.length} is less than visualise amount:${dbSettings.visualise}`);
        dbSettings.visualise = dbSettings.activelist.length;
        dbSettingsUpdate(dbSettings).then((docs) => {
          debug(docs);
        })
      }
      res.json({
        stories: docs,
        activelistChange: dbSettings.activelist.length,
        visualise: dbSettings.visualise
      });
    });
  }).catch((err) => {
    debug("Error: ", err);
  });
}
