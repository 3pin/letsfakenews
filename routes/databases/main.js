'use strict';
const debug = require('debug')('databases_main')

// populate an array of _id's
let db_ids = [];

module.exports = (req, res) => {
  debug('entered route /GET /databases')
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
    debug('[db_ids] total_length: ' + db_ids.length);
    res.render('databases/main', {
      tabtitle: "LetsFakeNews:db_main",
      stories: docs
    });
  });
};
