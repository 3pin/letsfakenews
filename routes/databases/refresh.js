'use strict';

const debug = require('debug')('databases_refresh');
const refresh_urls_iterative = require('../../modules/refresh_urls_iterative.js');

module.exports = (req, res) => {
  debug('/PUT routes/databases/refresh');
  /* fetch the db entries */
  let collection = req.db.get(process.env.COLLECTION);
  // return the empty db to the frontend
  collection.find({}, {
    sort: {
      _id: 1
    }
  }, (err, docs) => {
    //bulk replace the collection
    refresh_urls_iterative.process(docs).then((result) => {
      collection.drop();
      collection.insert(result);
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
