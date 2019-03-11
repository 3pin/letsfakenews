'use strict';

const debug = require('debug')('routes_admin');

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

module.exports = (req, res) => {
  let collection = req.db.get(process.env.COLLECTION);
  debug('/DELETE routes/databases/remove');
  // if entry was active... remove entry from activelist
  req.app.locals.activelist = req.app.locals.activelist.filter(item => item != req.body._id);
  // delete the entry from db
  let query = {
    _id: req.body._id
  };
  debug(req.body._id);
  collection.remove(query, {
    multi: false
  }).then((err, docs) => {
    if (err) {
      debug('error');
      //debug(err);
    } else {
      debug('no error');
      //debug(docs.result.n + " document(s) deleted");
    }
  }).then(() => {
    // fetch the db to refresh the frontend
    collection.find({}, {
      sort: {
        _id: 1
      }
    }, (err, docs) => {
      res.json({
        stories: docs
      });
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
