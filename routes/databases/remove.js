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
  /* delete a db entry */
  debug('entered route /DELETE /databases to delete: ' + req.body.data)
  let query = {
    _id: req.body.data
  };
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
    // print out the new shortened db
    debug('resending database to client');
    collection.find({}, {}, function(err, docs) {
      if (err) {
        debug(err);
      } else {
        let object
        for (object in docs) {
          debug('db remaining _id: ' + docs[object]._id + ' title: ' + docs[object].title);
        }
      }
    });
  }).then(() => {
    // need to now reorder the [db_entries] array without the removed entry
    debug('removing & re-ordering [db-entries]');
    debug('array length before: '+ req.app.locals.ordered_ids.length)
    req.app.locals.ordered_ids.splice(req.app.locals.ordered_ids.indexOf(req.body.data), 1);
    debug('array length after: '+ req.app.locals.ordered_ids.length)
    // print out db-entries array
    let item
    for (item in req.app.locals.ordered_ids) {
      debug(req.app.locals.ordered_ids[item]);
    }
    // step back new-story-id-to-read incase a new story is about to be read during the removal-action
    if (req.app.locals.id_to_read > 0) {
      debug('id_to_read before: ' + req.app.locals.id_to_read)
      req.app.locals.id_to_read = (parseInt(req.app.locals.id_to_read) - 1).toString();
      debug('id_to_read after: ' + req.app.locals.id_to_read)
      debug('db_entries next new_story id_to_read: ' + req.app.locals.id_to_read);
    }
  }).catch((err) => {
    debug("Err: ", err);
  });
};
