'use strict';
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// import mongoose schemas
const Settings = require('../../models/settings.model');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story');
  // fetch db settings
  let dbSettings = req.dbSettings;
  debug(dbSettings);
  // preprocess 'title' to CAPS & add 'storylive' attribute
  let client_JSON = req.body;
  client_JSON.title = req.body.title.toUpperCase();
  client_JSON.storylive = dbSettings.autolive;
  debug(client_JSON);
  // process JSON... add NLP_words & matching urls
  const process_client_story = require('../../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    // 'result' contains: story/title/storylive/time/words/urls
    //debug(result);
    debug(result.urls[0]);
    if (result.urls[0] === undefined) {
      res.send('Failure');
    }
    else {
      let story = new Story({ ...result});
      story.save().then((result) => {
        //debug(result);
        debug('Document inserted to db successfully');
        res.send('Success');
        // fetch updated db to then pass onto frontend
        Story.find({}).then((docs) => {
          //debug(docs);
          // tell eventbus about a new-story to trigger refresh of admin-frontend
          bus.emit('story', docs);
          debug('SSE event triggered by New_Story');
          //if autolive is TRUE, then new-story should be auto added to activelist
          if (dbSettings.autolive == true) {
            dbSettings.activelist.push(docs[docs.length - 1]._id);
            dbSettings.entry_to_read = dbSettings.activelist.length - 1;
            dbSettings.db_mode = 'next';
            const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
            dbSettingsUpdate(dbSettings).then((docs) => {
              //debug(docs);
            })
          }
        });
      }).catch((err) => {
        debug("Err: ", err);
      });
    }
  }).catch((err) => {
    debug("Err: ", err);
  });
}
