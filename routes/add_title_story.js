'use strict';

const debug = require('debug')('index_add')

module.exports = (req, res, next) => {
  // receive title-story info
  let client_JSON = req.body
  debug('client_JSON: ' + client_JSON)
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
    }).then(() => {
      next();
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}, (req, res) => {
  /* refresh db stories */
  debug('This could would refresh the admin-frontend')
  /*
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    debug(docs)
    res.render('database', {
      tabtitle: "LetsFakeNews:database",
      stories: docs
    });
  });
  */
}
