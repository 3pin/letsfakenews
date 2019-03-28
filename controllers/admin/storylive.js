'use strict';

const debug = require('debug')('routes_admin');
// import mongoose schemas
const Story = require('../../models/story.model');
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  let dbSettings = req.dbSettings;
  /* update an entries display-checkbox */
  debug('/PUT routes/databases/storylive');
  debug('_id: ' + req.body._id + ' currently set to: ' + req.body.storylive);
  // if checkbox is true/false... add/remove from activelist
  var new_status;
  if (req.body.storylive === true) {
    debug('Setting to FALSE');
    new_status = false;
    dbSettings.activelist = dbSettings.activelist.filter(item => item != req.body._id);
    Settings.findOneAndUpdate({}, {
        activelist: dbSettings.activelist
      }, {
        new: true
      })
      .then((res) => {
        debug('response');
        debug(res);
      });
  } else {
    debug('Setting to TRUE');
    new_status = true;
    dbSettings.activelist.push(req.body._id);
    dbSettings.entry_to_read = dbSettings.activelist.length - 1;
    dbSettings.db_mode = 'next';
    Settings.findOneAndUpdate({}, {
        activelist: dbSettings.activelist,
        entry_to_read: dbSettings.entry_to_read,
        db_mode: dbSettings.db_mode
      }, {
        new: true
      })
      .then((res) => {
        debug('response');
        debug(res);
      });
  }
  //update database so the frontend continues to reflect status of the checbox
  const query = {
    _id: req.body._id
  };
  Story.findOneAndUpdate(query, {
    storylive: new_status
  }, {
    new: true
  }).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
    }
  }).then(() => {
    // return updated version of the db to the frontend admin page
    Story.find({}).then((docs) => {
      res.send({
        stories: docs
      });
    });
  }).catch((err) => {
    debug(err);
  });
}
