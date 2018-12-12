// public routes into the app

'use strict';
const debug = require('debug')('displays_request')

module.exports = (req, res) => {
  let id;

  // serve story to displaypage when-previous-story-finished
  debug('entered route /GET /displays/request_new_story')
  // Set our collection
  let collection = req.db.get(process.env.COLLECTION);
  // calculate what the id of the next story is and any necessary changes to db_mode
  let db_fetch_mode = require('../../modules/db_fetch_mode.js');
  debug('A')
  if (req.app.locals.db_mode == 'old_story') {
    debug('Using: old_story')
    // calculate what the id of the randomly-chosen story is
    id = db_fetch_mode.random_entry(req.app.locals.ordered_ids).id
  } else {
    debug('Using: new_story')
    id = db_fetch_mode.next_entry(req.app.locals.ordered_ids, req.app.locals.id_to_read).id
    //set global vars for next-time-around
    req.app.locals.id_to_read = db_fetch_mode.next_entry(req.app.locals.ordered_ids, req.app.locals.id_to_read).id_to_read
    req.app.locals.db_mode = db_fetch_mode.next_entry(req.app.locals.ordered_ids, req.app.locals.id_to_read).db_mode
  }
  debug('B')
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
