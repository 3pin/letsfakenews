'use strict'
const debug = require('debug')('routes_write')
/* tap into an sse event-bus */
const bus = require('../../modules/eventbus')
/* load update module */
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate')
/* import mongoose schemas */
const Story = require('../../models/story.model')

module.exports = (req, res) => {
  debug('/POST routes/add_title_story')
  /* fetch db settings */
  const dbSettings = req.dbSettings
  debug('dbSettings...')
  debug(dbSettings)
  const clientJSON = req.body
  debug(clientJSON)
  debug('Unprocessed news...')
  /* preprocess 'title' to CAPS */
  // clientJSON.title = clientJSON.title.toUpperCase();
  /* preprocess 'title' & 'story' removing linebreaks */
  clientJSON.title = clientJSON.title.replace(/(\r\n|\n|\r)/gm, ' ')
  clientJSON.story = clientJSON.story.replace(/(\r\n|\n|\r)/gm, ' ')
  /* process... add storylive, add NLP_words, add matching urls */
  clientJSON.storylive = dbSettings.autolive
  const processClientStory = require('../../modules/processClientStory.js')
  processClientStory.process(clientJSON).then((result) => {
    /* 'result' now contains: story/title/storylive/time/words/urls */
    debug('Processed news...')
    debug(result)
    // debug(result.urls[0]);
    if (result === null) {
      res.send('NO_NOUNS')
    } else if (result.urls[0] === undefined) {
      res.send('NO_URLS')
    } else {
      const story = new Story({ ...result })
      debug(story.storylive)
      debug(story._id)
      story.save().then((saved) => {
        debug('Document inserted to db successfully...')
        res.send('Success')
        /* fetch all entries matching the Story-model from db sorted by ascending key '_id' ... */
        Story.find({}).sort([['_id', 1]]).then((docs) => {
          debug('stories in db are ...')
          /* tell eventbus about a new-story to trigger refresh of admin-frontend */
          bus.emit('story', docs)
          /* if storylive is TRUE, then should be auto added to activelist */
          if (story.storylive === true) {
            /* tell eventbus about a new-story to trigger update of activeList */
            debug('SSE event triggered by New_Story')
            bus.emit('activelistChange', dbSettings.activelist.length + 1)
            dbSettings.activelist.push(story._id)
            dbSettings.entryToRead = dbSettings.activelist.length - 1
            dbSettings.dbMode = 'next'
            dbSettingsUpdate(dbSettings).then((docs) => {
              debug(docs)
            })
          }
        })
      }).catch((err) => {
        debug('Err: ', err)
      })
    }
  }).catch((err) => {
    debug('Err: ', err)
  })
}
