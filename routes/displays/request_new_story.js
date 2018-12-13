// public routes into the app

'use strict';
const debug = require('debug')('displays_request')

module.exports = (req, res) => {
  // serve story to displaypage when-previous-story-finished
  debug('entered route /GET /displays/request_new_story')
  // Set our collection
  let collection = req.db.get(process.env.COLLECTION);
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
  // print out db-entries array
  let item
  for (item in req.app.locals.ordered_ids) {
    debug(req.app.locals.ordered_ids[item]);
  }
  // calculate what the id of the next story is and any necessary changes to db_mode
  let db_fetch_mode = require('../../modules/db_fetch_mode.js');
  // fetch an id for next story to read... either randomly or sequentially depending on whether new-stories have been submitted
  let _id;
  let obj;
  if (req.app.locals.db_mode == 'old_story') {
    debug('Using mode: old_story');
    obj = db_fetch_mode.random_entry(req.app.locals.ordered_ids, parseInt(req.app.locals.id_to_read));
    _id = obj.id;
  } else {
    debug('Using mode: new_story');
    obj = db_fetch_mode.next_entry(req.app.locals.ordered_ids, parseInt(req.app.locals.id_to_read));
    _id = obj.id;
    // set global vars for next-sequential-time-around
    debug('Setting app variables for next time around')
    req.app.locals.db_mode = obj.db_mode;
    req.app.locals.id_to_read = obj.id_to_read;
    debug('db_mode for nest time: ' + req.app.locals.db_mode);
    debug('id_to_read for nest time: ' + req.app.locals.id_to_read);
  }
  debug('db id_to_read: ' + _id);
  // return the JSON from db
  collection.findOne({
    _id: _id
  }, function(err, data) {
    if (err) {
      debug(err)
    } else {
      res.send(data);
    }
  }).catch((err) => {
    debug("Err: ", err);
  });
}
