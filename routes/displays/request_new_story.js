// public routes into the app

'use strict';
const debug = require('debug')('displays_request')

module.exports = (req, res) => {
  //declare the db-read-mode: old_story || new_story
  let db_mode = req.app.locals.db_mode;
  // create an array of db_entries sorted by datetime (ie. _id)
  let ordered_ids = req.app.locals.ordered_ids;
  // id_to_read from above array
  let id_to_read = req.app.locals.id_to_read;
  // next id to use to fetch a story from db
  let id = req.app.locals.id;

  // serve story to displaypage when-previous-story-finished
  debug('entered route /GET /displays/request_new_story')
  // Set our collection
  let collection = req.db.get(process.env.COLLECTION);
  // calculate what the id of the next story is and any necessary changes fo db_mode
  let db_fetch_mode = require('../../modules/db_fetch_mode.js');
  if (db_mode == 'old_story') {
    // calculate what the id of the randomly-chosen story is
    id = db_fetch_mode.random_entry(ordered_ids).id
  } else {
    id = db_fetch_mode.next_entry(ordered_ids, id_to_read).id
    db_mode = db_fetch_mode.next_entry(ordered_ids, id_to_read).db_mode
    id_to_read = db_fetch_mode.next_entry(ordered_ids, id_to_read).id_to_read
  }
  // return the JSON from db
  collection.findOne({
    _id: id
  }, function(err, data) {
    if (err) {
      debug(err)
    } else {
      res.send(data);
    }
  });
}
