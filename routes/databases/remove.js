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
    collection.find({}, {
      sort: {
        _id: 1
      }
    }, (err, docs) => {
      if (err) {
        debug(err);
      } else {
        let object
        for (object in docs) {
          debug('db remaining _id: ' + docs[object]._id + ' title: ' + docs[object].title);
        }
      }
    })
  }).then(() => {
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
}
