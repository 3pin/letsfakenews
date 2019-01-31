// public routes into the app

'use strict';
const debug = require('debug')('displays_reqnewstory');

module.exports = (req, res) => {
  // serve story to displaypage when-previous-story-finished
  debug('/GET routes/displays/request_new_story')

  // choose a story...
  let db_fetch_mode = require('../../modules/db_fetch_mode.js');
  let obj = db_fetch_mode.next_entry(req.app.locals.activelist, req.app.locals.entry_to_read);
  debug('id to read from db: ' + obj.id);
  req.app.locals.db_mode = db_fetch_mode.db_mode;

  // set global vars for next-sequential-time-around
  //req.app.locals.db_mode = obj.db_mode;
  req.app.locals.entry_to_read = obj.entry_to_read;
  debug('Updating 4nextime: ' + req.app.locals.entry_to_read);

  // fetch the JSON from db
  debug('fetching the obj from db')
  let collection = req.db.get(process.env.COLLECTION);
  collection.findOne({
    _id: obj.id
  }, (err, data) => {
    res.send(data);
  }).catch((err) => {
    debug("Err: ", err);
  });
}
