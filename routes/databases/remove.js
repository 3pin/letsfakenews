'use strict';

const debug = require('debug')('databases_remove')

const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});

function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  //return next()
}

module.exports = (req, res) => {
  debug('entered route /DELETE /databases')
  /* delete a db entry */
  let query = {
    _id: req.body.data
  };
  debug(query)
  let collection = req.db.get(process.env.COLLECTION);
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
    debug('resending database');
    //send updated json back to /database/db_main
    collection.find({}, {}, function(e, docs) {
      res.send({
        stories: docs
      });
    });
  }).then( () => {
    debug('removing & re-ordering [db-entries]');
    debug('db_entries length: ' + req.app.locals.ordered_ids.length);
    // need to now reorder the [db_entries] array without the removed entry
    req.app.locals.ordered_ids.splice(req.app.locals.ordered_ids.indexOf(req.body.data), 1);
    if (req.app.locals.id_to_read > 0) {
      req.app.locals.id_to_read = req.app.locals.id_to_read-1;
      debug('db_entries length: ' + req.app.locals.ordered_ids.length);
    }
  }).catch((err) => {
    debug("Err: ", err);
  });
};
