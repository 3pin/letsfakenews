'use strict';
const debug = require('debug')('databases_main')

module.exports = (req, res) => {
  debug('entered route /GET /databases')
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(err, docs) {
    if (err) {
      debug(err);
    } else {
      let object
      for (object in docs) {
        debug('db _id: ' + docs[object]._id + ' title: ' + docs[object].title);
      }
      debug('db-id-array length: ' + object);
    }
    res.render('databases/main', {
      tabtitle: "LetsFakeNews:db_main",
      stories: docs
    });
  });
};
