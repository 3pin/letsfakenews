'use strict';

const debug = require('debug')('routes_admin');
// load update module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  debug('/routes/story/remove');
  // remove entry from activelist in dB
  let dbSettings = req.dbSettings;
  debug(req.dbSettings.activelist);
  req.dbSettings.activelist = req.dbSettings.activelist.filter(item => item != req.body._id);
  debug(req.dbSettings.activelist);
  // offset the next-story-to-read to account for deleted entry
  req.dbSettings.entry_to_read = req.dbSettings.entry_to_read - 1;
  dbSettingsUpdate(req.dbSettings).then((docs) => {
    debug(docs);
  })
  // delete entry from actual db
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
      bus.emit('activelistChange', dbSettings.activelist.length);
      res.json({
        stories: docs,
        activelistChange: dbSettings.activelist.length
      });
    });
  }).catch((err) => {
    debug("Error: ", err);
  });
}
