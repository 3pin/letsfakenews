'use strict';

const debug = require('debug')('index_add')

module.exports = (req, res) => {

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
      //res.send('Document inserted to db successfully');
      //next();

      // fetch the just-saved JSON's _id to add to the sorted-array-of-ids...
      collection.findOne({
        title: output.title
      }).then((data) => {
        let newest_id = data._id
        req.app.locals.ordered_ids.push(newest_id);
        debug('db_entries length: ' + req.app.locals.id_to_read.length);
        //if a new_story is not currently being read, then set the index-to-fetch-from to last-entry in the array for next-time-around
        if (req.app.locals.db_mode == 'old_story') {
          req.app.locals.db_mode = 'new_story';
          debug('Switched db_fetch_mode to: new_story');
          // return no of entries in database
          collection.count({}, {}).then((response) => {
            // offset-1 as it will get incremented in the next_story function anyway
            req.app.locals.id_to_read = response - 1;
            debug('db_entries id_to_read: ' + req.app.locals.id_to_read);

          }).then(() => {
            //next();
          })
        }
      });
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}, (req, res) => {
  /* refresh db stories */
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
