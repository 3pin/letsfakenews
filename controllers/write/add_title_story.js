'use strict';
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// load update module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose schemas
const Settings = require('../../models/settings.model');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story');
  // fetch db settings
  let dbSettings = req.dbSettings;
  debug('dbSettings...');
  debug(dbSettings);
  // preprocess 'title' to CAPS & add 'storylive' attribute
  let client_JSON = req.body;
  debug('Unprocessed news...');
  debug(client_JSON);
  // process... add storylive, add NLP_words, add matching urls
  client_JSON.title = req.body.title.toUpperCase();
  client_JSON.storylive = dbSettings.autolive;
  const process_client_story = require('../../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    // 'result' contains: story/title/storylive/time/words/urls
    debug('Processed news...');
    debug(result);
    //debug(result.urls[0]);
    if (result === null) {
      res.send('NO_NOUNS');
    } else if (result.urls[0] === undefined) {
      res.send('NO_URLS');
    }
    else {
      let story = new Story({ ...result});
      debug(story.storylive)
      debug(story._id)
      story.save().then((saved) => {
        debug('Document inserted to db successfully...');
        res.send('Success');
        // fetch all entries matching the Story-model from db...
        Story.find({}).then((docs) => {
          // tell eventbus about a new-story to trigger refresh of admin-frontend
          bus.emit('story', docs);
          debug('SSE event triggered by New_Story');
          // if storylive is TRUE, then should be auto added to activelist
          if (story.storylive === true) {
            dbSettings.activelist.push(story._id);
            dbSettings.entry_to_read = dbSettings.activelist.length - 1;
            dbSettings.db_mode = 'next';
            dbSettingsUpdate(dbSettings).then((docs) => {
              debug(docs);
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
