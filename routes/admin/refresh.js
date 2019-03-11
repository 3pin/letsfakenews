'use strict';

const debug = require('debug')('routes_admin');
const refresh_urls_iterative = require('../../modules/refresh_urls_iterative.js');

module.exports = (req, res) => {
  debug('/PUT routes/databases/refresh');
  /* fetch the db entries */
  let collection = req.db.get(process.env.DB_STORIES);
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
    }).then(() => {
      res.send({RefreshStatus: 'Refresh of all images completed'});
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
