'use strict';

const debug = require('debug')('index_add')

module.exports = (req, res) => {
  //declare the db-read-mode: old_story || new_story
  let db_mode = req.app.locals.db_mode;
  // create an array of db_entries sorted by datetime (ie. _id)
  let ordered_ids = req.app.locals.ordered_ids;
  // id_to_read from above array
  let id_to_read = req.app.locals.id_to_read;
  // next id to use to fetch a story from db
  let id = req.app.locals.id;

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
      //next();
      //res.send('Document inserted to db successfully');
      // fetch the just-saved JSON's _id to add to the sorted-array-of-ids...
      collection.findOne({
        title: output.title
      }).then((data) => {
        let newest_id = data._id
        ordered_ids.push(newest_id)
        res.app.locals.ordered_ids = ordered_ids;
        //if there is no new_story currently being read then offset the index-to-fetch-from for next-time-around
        if (db_mode == 'old_story') {
          db_mode = 'new_story';
          res.app.locals.db_mode = db_mode;
          debug('Switched db_fetch_mode to: ' + db_mode);
          // return no of entries in database
          collection.count({}, {}).then((response) => {
            // offset-1 as it will get incremented in the next_story function anyway
            id_to_read = response - 1
            res.app.locals.id_to_read = id_to_read;
          }).then(() => {
            //return db_mode, ordered_ids, id_to_read, id
            //next();
          })
        }
      });
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}, (req, res) => {
  return db_mode, ordered_ids, id_to_read, id
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
