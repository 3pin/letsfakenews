'use strict';

const debug = require('debug')('databases/clear')

module.exports = (req, res) => {
  let collection = req.db.get(process.env.COLLECTION);
  /* delete a db entry */
  debug('/DELETE routes/databases/clear');
  let query = {
    _id: req.body.data
  };
  collection.drop().then((err, docs) => {
    if (err) {
      debug('error');
      //debug(err);
    } else {
      debug('no error');
      //debug(docs.result.n + " document(s) deleted");
    }
  }).then(() => {
    // return the empty db to the frontend
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
  }).then(() => {
    // empty the active activelist
    // if entry was active... remove entry from activelist
    req.app.locals.activelist = [];
    req.app.locals.entry_to_read = 0;
  }).catch((err) => {
    debug("Err: ", err);
  });
}
