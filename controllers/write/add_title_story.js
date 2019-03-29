'use strict';
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// import mongoose schemas
const Base = require('../../models/base.model');
const Settings = require('../../models/settings.model');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story');
  // fetch db settings
  let dbSettings = req.dbSettings;
  debug(dbSettings);
  // process title-story info
  let client_JSON = req.body;
  debug(client_JSON);
  client_JSON.title = req.body.title.toUpperCase();
  client_JSON.storylive = dbSettings.autolive;
  debug(client_JSON);
  // process JSON... add NLP_words & matching urls
  const process_client_story = require('../../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    debug(result);
    let story = new Story({ ...result
    });
    story.save().then((result) => {
      //debug(result);
      debug('Document inserted to db successfully');
      res.send('Story Saved successfully');
      // fetch updated db
      Story.find({}).then((docs) => {
        //debug(docs);
        //if autolive is TRUE, then new-story should be auto added to activelist
        if (dbSettings.autolive == true) {
          dbSettings.activelist.push(docs[docs.length - 1]._id);
          dbSettings.entry_to_read = dbSettings.activelist.length - 1;
          dbSettings.db_mode = 'next';
          const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
          dbSettingsUpdate(dbSettings).then((res) => {
            debug(res);
          });
        }
        // tell eventbus about a new-story to trigger refresh of admin-frontend
        bus.emit('story', docs);
        debug('SSE event triggered by New_Story');
      });
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}