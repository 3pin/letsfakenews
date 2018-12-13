// public routes into the app

'use strict';
const debug = require('debug')('displays_request');

module.exports = (req, res) => {
  // serve story to displaypage when-previous-story-finished
  debug('entered route /GET /displays/request_new_story')
  // populate an array of _id's
  let db_ids = [];
  //id to read from db
  let id;
  // Set our collection
  let collection = req.db.get(process.env.COLLECTION);
  //load ordered-stories from db
  collection.find({}, {
    sort: {
      _id: 1
    }
  }, (err, docs) => {
    let object
    for (object in docs) {
      db_ids.push(docs[object]._id);
      debug('[db_ids] _id: ' + docs[object]._id);
    }

    // chose next story... randomly || sequentially... depends on whether new-stories have been submitted
    let db_fetch_mode = require('../../modules/db_fetch_mode.js');
    let obj;
    debug('Current mode: ' + req.app.locals.db_mode);
    if (req.app.locals.db_mode === 'random_story') {
      obj = db_fetch_mode.random_entry(db_ids);
      id = obj.id;
    } else {
      obj = db_fetch_mode.next_entry(db_ids, req.app.locals.id_to_read);
      id = obj.id;
      // set global vars for next-sequential-time-around
      req.app.locals.db_mode = obj.db_mode;
      req.app.locals.id_to_read = obj.id_to_read;
      debug('Updating 4nextime: ' + req.app.locals.db_mode + ' ' + req.app.locals.id_to_read);
    }
    debug('db id_to_read: ' + id);

    // fetch the JSON from db
    debug('fetching the obj from db')
    collection.findOne({
      _id: id
    }, (err, data) => {
      res.send(data);
    }).catch((err) => {
      debug("Err: ", err);
    });

  }).catch((err) => {
    debug("Err: ", err);
  });
}
