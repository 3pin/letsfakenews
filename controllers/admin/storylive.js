'use strict';

const debug = require('debug')('routes_admin');
// import mongoose schemas
const Story = require('../../models/story.model');
// import function
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  debug('/routes/admin/storylive');
  let dbSettings = req.dbSettings;
  let storySettings = req.body;
  /* update an entries display-checkbox */
  debug('_id: ' + storySettings._id + ' currently set to: ' + storySettings.storylive);
  bus.emit('activelistChange');
  // check checkbox is true/false... add/remove from activelist
  if (storySettings.storylive === true) {
    debug('Must set to FALSE');
    // remove from activelist
    dbSettings.activelist = dbSettings.activelist.filter(item => item != storySettings._id);
    dbSettingsUpdate(dbSettings).then((doc) => {
      debug(doc);
    });
    // update db storylive entry
    Story.findByIdAndUpdate(storySettings._id, {
      storylive: false
    }, {
      new: true
    }).then(() => {
      // send new db to frontend to update REACT state
      Story.find({}).sort([['_id', 1]]).then((docs, err) => {
        debug(docs);
        res.json({
          stories: docs,
          activelistLength: dbSettings.activelist.length,
        });
      });
    }).catch((err) => {
      debug(err);
    });
  } else {
    debug('Must set to TRUE');
    dbSettings.activelist.push(storySettings._id);
    dbSettings.entry_to_read = dbSettings.activelist.length - 1;
    dbSettings.db_mode = 'next';
    dbSettingsUpdate(dbSettings).then((doc) => {
      debug(doc);
    });
    // update db storylive entry
    Story.findByIdAndUpdate(storySettings._id, {
      storylive: true
    }, {
      new: true
    }).then(() => {
      // send new db to frontend to update REACT state
      Story.find({}).sort([['_id', 1]]).then((docs, err) => {
        debug(docs);
        res.json({
          stories: docs,
          activelistLength: dbSettings.activelist.length,
        });
      });
    }).catch((err) => {
      debug(err);
    });
  }
}
