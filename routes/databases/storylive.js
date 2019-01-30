'use strict';

const debug = require('debug')('databases_storylive')

module.exports = (req, res) => {
  let collection = req.db.get(process.env.COLLECTION);
  /* delete a db entry */
  debug('/PUT routes/databases/storylive');
  debug('_id: ' + req.body.id);
  debug('storylive status: ' + req.body.storylive);
  let query = {
    _id: req.body.id
  };
  collection.update(query, {$set:{storylive:req.body.storylive}}, {upsert:true, multi:false}).then((err, docs) => {
    if (err) {
      debug('error');
      debug(err);
    } else {
      debug('no error');
      debug(docs);
    }
  }).then(() => {
    // print out the new shortened db
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
        stories: docs});
    });
    /*
    // step back new-story-id-to-read incase a new story is about to be read during the removal-action
    if (req.app.locals.id_to_read > 0) {
      debug('id_to_read before: ' + req.app.locals.id_to_read)
      req.app.locals.id_to_read = (parseInt(req.app.locals.id_to_read) - 1).toString();
      debug('id_to_read after: ' + req.app.locals.id_to_read)
      debug('db_entries next new_story id_to_read: ' + req.app.locals.id_to_read);
    }
    */
  }).catch((err) => {
    debug("Err: ", err);
  });
}
