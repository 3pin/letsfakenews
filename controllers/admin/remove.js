'use strict';

const debug = require('debug')('routes_admin');
// load update module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/routes/story/remove');
  // remove entry from activelist in dB
  let dbSettings = req.dbSettings;
  debug(dbSettings.activelist);
  dbSettings.activelist = dbSettings.activelist.filter(item => item != req.body._id);
  debug(dbSettings.activelist);
  // offset the next-story-to-read to account for deleted entry
  dbSettings.entry_to_read = dbSettings.entry_to_read - 1;
  dbSettingsUpdate(dbSettings).then((docs) => {
    debug(docs);
  })
  // delete entry from actual db
  const query = {
    _id: req.body._id
  };
  debug(req.body._id);
  Story.findOneAndDelete(query).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
    }
  }).then(() => {
    // fetch the db to refresh the frontend
    Story.find({}).then((docs,err) => {
      debug(docs);
      res.json({
        stories: docs
      });
    });
  }).catch((err) => {
    debug("Error: ", err);
  });
}
