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
  // create an [db_entries] sorted by datetime (ie. _id)
  let ordered_ids = [];

  // serve story to display-page on startup
  debug('entered route /GET /displays')
  // declare db-collection
  let collection = req.db.get(process.env.COLLECTION);
  // populate [db_entries]
  collection.find({}, {
    sort: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug(err);
    } else {
      let object
      for (object in data) {
        req.app.locals.ordered_ids.push(data[object]._id)
      }
      // randomly chose a story and report its id
      const db_fetch_mode = require('../../modules/db_fetch_mode.js');
      let id = db_fetch_mode.random_entry(req.app.locals.ordered_ids).id
      // fetch that randomly-chosen story-OBJ and pass to display-client
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          res.render('displays/main', {
            data: data,
            tabtitle: "LetsFakeNews:Display"
          });
        }
      });
    }
  });
}
