'use strict';
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story')
  // receive title-story info
  let client_JSON = req.body
  client_JSON.storylive = req.app.locals.autolive;
  debug(client_JSON);
  //process JSON... add NLP_words & matching urls
  const process_client_story = require('../../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    debug('About to save to db');
    //save to db
    let collection = req.db.get(process.env.COLLECTION);
    collection.insert(result).then((output) => {
      debug('Document inserted to db successfully');
      res.send('Story inserted into database successfully');
    }).then(() => {
      debug('Refreshing the database-admin-frontend');
      // print out the new shortened db
      collection.find({}, {
        sort: {
          _id: 1
        }
      }, (err, docs) => {
        //if autolive is TRUE, then new-story should be auto added to activelist
        if (req.app.locals.autolive == true) {
          req.app.locals.activelist.push(docs[docs.length - 1]._id);
          req.app.locals.entry_to_read = req.app.locals.activelist.length - 1;
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
