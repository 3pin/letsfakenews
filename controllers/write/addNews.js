const debug = require('debug')('controller');
/* tap into an sse event-bus */
const bus = require('../../modules/eventbus');
/* load update module */
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
/* import mongoose schemas */
const Story = require('../../models/story.model');

const processClientStory = require('../../modules/processClientStory.js');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story');
  /* fetch db settings */
  const { dbSettings } = req;
  const { room } = req.query;
  debug(req.body);
  const clientJSON = req.body;
  debug('clientJSON...');
  debug(clientJSON);
  debug('Unprocessed news...');
  clientJSON.room = room;
  /* preprocess 'title' to CAPS */
  // clientJSON.title = clientJSON.title.toUpperCase();
  /* preprocess 'title' & 'story' removing linebreaks */
  clientJSON.title = clientJSON.title.replace(/(\r\n|\n|\r)/gm, ' ');
  clientJSON.story = clientJSON.story.replace(/(\r\n|\n|\r)/gm, ' ');
  /* process... add storylive, add NLP_words, add matching urls */
  clientJSON.storylive = dbSettings.autolive;
  const storyWords = clientJSON.story.split(' ');
  debug(`storyWords: ${storyWords}`);
  let longestWord = '';
  for (let i = 0; i < storyWords.length; i += 1) {
    if (storyWords[i].length > longestWord.length) {
      longestWord = storyWords[i];
    }
  }
  if (storyWords.length < 5) {
    debug('Story has less than 5 words');
    res.status(422).json({
      message: 'STORY_WORDCOUNT',
    });
  } else if (longestWord.length > 45) {
    debug('Story has at least 1 non-word');
    res.status(422).json({
      message: 'STORY_NONWORD',
    });
  } else {
    processClientStory.process(clientJSON).then((result) => {
      /* 'result' now contains: story/title/storylive/time/words/urls */
      debug('Processed news...');
      debug(result);
      // debug(result.urls[0]);
      if (result === null) {
        debug('Either the story or title contain no nouns');
        res.status(422).json({
          message: 'NO_NOUNS',
        });
      } else if (result.urls[0] === undefined) {
        debug('Either the story of title contain no nouns');
        res.status(422).json({
          message: 'NO_URLS',
        });
      } else {
        const story = new Story({ ...result });
        debug(story.storylive);
        debug(story._id);
        story.save().then(() => {
          debug('Document inserted to db successfully...');
          res.send('Success');
          /* fetch all entries matching the Story-model from db sorted by ascending key '_id' ... */
          Story.find({}).sort([['_id', 1]]).then((stories) => {
            debug('stories in db are ...');
            debug(stories);
            const storiesObj = {
              room,
              stories,
            }
            /* tell eventbus about a new-story to trigger refresh of admin-frontend */
            bus.emit('news', storiesObj);
            /* if storylive is TRUE, then should be auto added to activelist */
            if (story.storylive === true) {
              dbSettings.activelist.push(story._id);
              dbSettings.entryToRead = dbSettings.activelist.length - 1;
              dbSettings.dbMode = 'next';
              dbSettingsUpdate(dbSettings, room).then((output) => {
                debug(output);
                /* tell eventbus about a new-story to trigger update of activeList */
                debug('SSE event triggered by New_Story');
                const activelistObj = {
                  room,
                  update: dbSettings.activelist.length,
                }
                bus.emit('activelistChange', activelistObj);
              });
            }
          });
        }).catch((err) => {
          debug('Err: ', err);
          res.status(500).json({
            message: 'DB_ERROR',
          });
        });
      }
    }).catch((err) => {
      debug('Err: ', err);
    });
  }
};
