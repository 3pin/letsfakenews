'use strict';

const debug = require('debug')('databases_storylive');

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

module.exports = (req, res) => {
  let collection = req.db.get(process.env.COLLECTION);
  /* update an entries display-checkbox */
  debug('/PUT routes/databases/storylive');
  debug('_id: ' + req.body.id);
  debug('storylive status: ' + req.body.storylive);
  // if checkbox is true/false... add/remove from activelist
  if (req.body.storylive == true) {
    debug('storylive: true');
    req.app.locals.activelist.push(req.body.id);
    req.app.locals.entry_to_read = req.app.locals.activelist.length - 1;
    req.app.locals.db_mode = 'next';
    debug(req.app.locals.db_mode);
    debug(req.app.locals.entry_to_read);
    debug(req.app.locals.activelist);
  } else {
    debug('storylive: false');
    req.app.locals.activelist = req.app.locals.activelist.filter(item => item != req.body.id);
    debug(req.app.locals.activelist);
  }
  let query = {
    _id: req.body.id
  };
  //update database so the frontend continues to reflect status of the checbox
  collection.update(query, {
    $set: {
      storylive: req.body.storylive
    }
  }, {
    upsert: true,
    multi: false
  }).then((err, docs) => {
    if (err) {
      debug('error');
      debug(err);
    } else {
      debug('no error');
      debug(docs);
    }
  }).then(() => {
    // return updated version of the db to the frontend admin page
    collection.find({}, {
      sort: {
        _id: 1
      }
    }, (err, docs) => {
      // populate an array of _id's
      let db_ids = [];
      let object
      for (object in docs) {
        db_ids.push(docs[object]._id);
        debug('[db_ids] _id: ' + docs[object]._id);
      }
      debug('[db_ids] total_length: ' + db_ids.length);
      res.json({
        stories: docs
      });
    });
  }).catch((err) => {
    debug(err);
  });
}
