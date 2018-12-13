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
      // fetch the just-saved JSON's _id to add to the sorted-array-of-ids...
      collection.findOne({
        title: output.title
      }).then((data) => {
        let newest_id = data._id
        req.app.locals.ordered_ids.push(newest_id);
        //if a new_story is not currently being read, for next-time-around, set index-to-fetch-from to last-entry in array
        if (req.app.locals.db_mode == 'old_story') {
          req.app.locals.db_mode = 'new_story';
          debug('Switched db_fetch_mode to: new_story');
          // return no of entries in database
          collection.count({}, {}).then((response) => {
            // offset by '1' as it will get incremented in the next_story function anyway
            debug('db-id-array length now: ' + response);
            req.app.locals.id_to_read = parseInt(response) - 1;
            debug('db_entries next entry to read: ' + parseInt(req.app.locals.id_to_read));
          }).then(() => {
            // print out the new shortened db
            debug('resending database to client');
            collection.find({}, {}, function(err, docs) {
              if (err) {
                debug(err);
              } else {
                let object
                for (object in docs) {
                  debug('db _id: ' + docs[object]._id + ' title: ' + docs[object].title);
                }
              }
            });
          }).then(() => {
            next();
          });
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
