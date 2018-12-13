// public routes into the app
'use strict';
const debug = require('debug')('displays_main')

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
  // serve story to display-page on startup
  debug('entered route /GET /displays')
  // declare db-collection
  let collection = req.db.get(process.env.COLLECTION);
  // populate [db_entries] for the first time... then randomly choosing from it
  collection.find({}, {sort: {_id: 1}}, function(err, docs) {
    if (err) {
      debug(err);
    } else {
      let object
      for (object in docs) {
        req.app.locals.ordered_ids.push(docs[object]._id)
        debug('db _id: ' + docs[object]._id + ' title: ' + docs[object].title);
      }
      debug('db_entries length: ' + req.app.locals.ordered_ids.length);
      // randomly chose a story... report its id
      const db_fetch_mode = require('../../modules/db_fetch_mode.js');
      let _id = db_fetch_mode.random_entry(req.app.locals.ordered_ids).id
      debug('db id_to_read: ' + _id);
      // fetch that randomly-chosen story-OBJ and pass to display-client
      collection.findOne({
        _id: _id
      }, function(err, docs) {
        if (err) {
          debug(err)
        } else {
          res.render('displays/main', {
            data: docs,
            tabtitle: "LetsFakeNews:Display"
          });
        }
      });
    }
  });
}
