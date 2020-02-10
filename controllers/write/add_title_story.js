'use strict';
const debug = require('debug')('routes_write');
/* tap into an sse event-bus */
const bus = require('../../modules/eventbus');
/* load update module */
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
/* import mongoose schemas */
const Settings = require('../../models/settings.model');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story');
  /* fetch db settings */
  let dbSettings = req.dbSettings;
  debug('dbSettings...');
  debug(dbSettings);
  let client_JSON = req.body;
  debug(client_JSON);
  debug('Unprocessed news...');
  /* preprocess 'title' to CAPS */
  //client_JSON.title = client_JSON.title.toUpperCase();
  /* preprocess 'title' & 'story' removing linebreaks */
  client_JSON.title = client_JSON.title.replace(/(\r\n|\n|\r)/gm, " ");
  client_JSON.story = client_JSON.story.replace(/(\r\n|\n|\r)/gm, " ");
  /* process... add storylive, add NLP_words, add matching urls */
  client_JSON.storylive = dbSettings.autolive;
  const process_client_story = require('../../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    /* 'result' now contains: story/title/storylive/time/words/urls */
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
        /* fetch all entries matching the Story-model from db sorted by ascending key '_id' ... */
        Story.find({}).sort([['_id', 1]]).then((docs) => {
          debug('stories in db are ...')
          /* tell eventbus about a new-story to trigger refresh of admin-frontend */
          bus.emit('story', docs);
          /* tell eventbus about a new-story to trigger update of activeList */
          bus.emit('activelistChange', dbSettings.activelist.length + 1);
          debug('SSE event triggered by New_Story');
          /* if storylive is TRUE, then should be auto added to activelist */
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
