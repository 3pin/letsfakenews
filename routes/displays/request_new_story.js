// public routes into the app

'use strict';
const debug = require('debug')('displays/reqnewstory');
// module variable to hold the id to read from the db
let id;

module.exports = (req, res) => {
  // serve story to displaypage when-previous-story-finished
  debug('/GET routes/displays/request_new_story')

  // choose an id from activelist[]...
  debug(req.app.locals.activelist);
  let db_fetch_mode = require('../../modules/db_fetch_mode.js');
  let obj;
  if (req.app.locals.db_mode == 'next') {
    obj = db_fetch_mode.next_entry(req.app.locals.activelist, req.app.locals.entry_to_read);
    // set global vars for next-sequential-time-around
    req.app.locals.entry_to_read = obj.entry_to_read;
    debug(obj.entry_to_read);
  } else {
    obj = db_fetch_mode.random_entry(req.app.locals.activelist);
  }
  req.app.locals.db_mode = obj.db_mode;
  debug(req.app.locals.db_mode);
  id = obj.id;
  debug('id to read from activelist: ' + id);

  // fetch the JSON from db
  debug('fetching the obj from db')
  let collection = req.db.get(process.env.COLLECTION);
  collection.findOne({
    _id: id
  }, (err, data) => {
    res.send(data);
  }).catch((err) => {
    debug("Err: ", err);
  });
}
