'use strict';

const debug = require('debug')('routes_admin');
/* import mongoose schemas */
const Story = require('../../../models/story.model');
/* import function */
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
/* tap into an sse event-bus */
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/routes/admin/storylive');
  let storySettings = req.body;
  let dbSettings = req.dbSettings;
  debug('_id: ' + storySettings._id + ' currently set to: ' + storySettings.storylive);
  debug(`activelist:${dbSettings.activelist.length} VS... visualise-amount:${dbSettings.visualise}`);
  /* checkbox true/false? -> add/remove from activelist */
  if (storySettings.storylive === true) {
    debug('Set to FALSE');
    /* remove entry from activelist */
    dbSettings.activelist = dbSettings.activelist.filter(item => item != storySettings._id);
    debug(`activelist:${dbSettings.activelist.length} VS... visualise-amount:${dbSettings.visualise}`);
    /* check if activelist.length < visualise.length */
    if (dbSettings.activelist.length <= dbSettings.visualise) {
      debug(`activelist:${dbSettings.activelist.length} is <= visualise-amount:${dbSettings.visualise}`);
      dbSettings.visualise = dbSettings.activelist.length;
    }
    dbSettingsUpdate(dbSettings).then((doc) => {
      debug(`db updated to: ${doc}`);
      bus.emit('activelistChange', dbSettings.activelist.length);
    });
    /* update db storylive entry */
    Story.findByIdAndUpdate(storySettings._id, {
      storylive: false
    }, {
      new: true
    }).then(() => {
      /* send new db to frontend to update REACT state */
      Story.find({}).sort([['_id', 1]]).then((docs, err) => {
        debug(docs);
        res.json({
          stories: docs,
          activelistLength: dbSettings.activelist.length,
          visualise: dbSettings.visualise
        });
      });
    }).catch((err) => {
      debug(err);
    });
  } else {
    debug('Set to TRUE');
    dbSettings.activelist.push(storySettings._id);
    dbSettings.entry_to_read = dbSettings.activelist.length - 1;
    dbSettings.db_mode = 'next';
    dbSettingsUpdate(dbSettings).then((doc) => {
      debug(`dd updated to: ${doc}`);
      bus.emit('activelistChange', dbSettings.activelist.length);
    });
    /* update db storylive entry */
    Story.findByIdAndUpdate(storySettings._id, {
      storylive: true
    }, {
      new: true
    }).then(() => {
      /* send new db to frontend to update REACT state */
      Story.find({}).sort([['_id', 1]]).then((docs, err) => {
        debug(docs);
        res.json({
          stories: docs,
          activelistLength: dbSettings.activelist.length,
          visualise: dbSettings.visualise
        });
      });
    }).catch((err) => {
      debug(err);
    });
  }
}
