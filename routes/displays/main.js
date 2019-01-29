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

// serve story to display-page on startup
module.exports = (req, res) => {
  debug('/GET routes/displays')
  // populate an array of _id's
  let db_ids = [];
  //_id to read from db
  let id;
  let collection = req.db.get(process.env.COLLECTION);

  //load ordered-stories from db
  collection.find({}, {
    sort: {
      _id: 1
    }
  }, (err, docs) => {
    let object
    for (object in docs) {
      // could check here for the entries 'autolive' attribute...
      //    if autolive.attr == yes
      //        then db_ids.push(docs[object]._id)
      db_ids.push(docs[object]._id);
      debug('[db_ids] _id: ' + docs[object]._id);
    }

    // choose the first story in db... report its id
    let db_fetch_mode = require('../../modules/db_fetch_mode.js');
    let obj = db_fetch_mode.next_entry(db_ids,0);
    id = obj.id;
    debug('id to read from db: ' + id);
    // set global vars for next-sequential-time-around
    req.app.locals.db_mode = obj.db_mode;
    req.app.locals.id_to_read = obj.id_to_read;
    debug('Updating 4nextime: ' + req.app.locals.db_mode + ' ' + req.app.locals.id_to_read)

    // fetch that randomly-chosen obj and pass to display-client
    collection.findOne({
      _id: id
    }, (err, docs) => {
      debug(JSON.stringify(docs));
      res.render('displays/main', {
        data: docs,
        tabtitle: "LetsFakeNews:Display"
      });
    }).catch((err) => {
      debug("Err: ", err);
    });

  }).catch((err) => {
    debug("Err: ", err);
  });

}
