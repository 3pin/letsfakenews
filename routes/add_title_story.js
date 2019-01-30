'use strict';
const debug = require('debug')('main_story');
// tap into an sse event-bus
const bus = require('../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST routes/add_title_story')
  // receive title-story info
  let client_JSON = req.body
  client_JSON.autolive = req.app.locals.autolive;
  debug(client_JSON);
  //process JSON... add NLP_words & matching urls
  const process_client_story = require('../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    //save to db
    let collection = req.db.get(process.env.COLLECTION);
    collection.insert(result).then((output) => {
      debug('Document inserted to db successfully');
      //if a new_story is not currently being read, for next-time-around, set index-to-fetch-from to last-entry in array
      if (req.app.locals.db_mode != 'new_story') {
        req.app.locals.db_mode = 'new_story';
        // return new no of entries in database
        collection.count({}, {}).then((response) => {
          // offset by '1' as it will get incremented in the next_story function anyway
          req.app.locals.id_to_read = response - 1;
          debug('db_entries next entry to read: ' + req.app.locals.id_to_read);
          debug('Switched mode to: ' + req.app.locals.db_mode);
        })
      }
      res.send('Story inserted into database successfully');
    }).then(() => {
      debug('Refresh the database-admin-frontend');
      // print out the new shortened db
      collection.find({}, {
        sort: {
          _id: 1
        }
      }, (err, docs) => {
        bus.emit('message', {stories: docs});
      });
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
