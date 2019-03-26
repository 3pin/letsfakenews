'use strict';
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// import mongoose schemas
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story');
  debug(req.app.locals.autolive);
  //setup db connection
  //let collection = req.db.get(process.env.DATABASE);
  // receive title-story info
  let client_JSON = req.body
  client_JSON.type = "story";
  client_JSON.storylive = req.app.locals.autolive;
  debug(client_JSON);
  //process JSON... add NLP_words & matching urls
  const process_client_story = require('../../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    let story = new Story({ ...result});
    debug(story);
    story.save()
      .then((result) => {
        debug(result);
        debug('Document inserted to db successfully');
        res.send('Story Saved successfully');
        // fetch updated db
        Story.find({type:"story"}).then((docs) => {
            debug(docs);
            //if autolive is TRUE, then new-story should be auto added to activelist
            if (req.app.locals.autolive == true) {
              req.app.locals.activelist.push(docs[docs.length-1]._id);
              req.app.locals.entry_to_read = req.app.locals.activelist.length-1;
              req.app.locals.db_mode = 'next';
              debug(req.app.locals.activelist);
              debug(req.app.locals.entry_to_read);
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
