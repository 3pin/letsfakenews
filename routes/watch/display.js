'use strict';

const debug = require('debug')('routes_watch')

// module variable to hold the id to read from the db
let id;

module.exports = (req, res) => {
  debug('/GET routes/displays')
  //load all stories (in order of _id) from db
  let collection = req.db.get(process.env.COLLECTION);
  collection.find( {}, {
    sort: {
      _id: 1
    }
  }).then( (docs) => {
    // populate the activelist[] with the active entries (ie storylive.atrr TRUE)
    req.app.locals.activelist = [];
    let object
    for (object in docs) {
      if (docs[object].storylive == true) {
        req.app.locals.activelist.push(docs[object]._id);
      }
    }
    debug(req.app.locals.activelist);
  }).then( () => {
    // choose an id from activelist[]...
    let db_fetch_mode = require('../../modules/db_fetch_mode.js');
    let obj;
    if (req.app.locals.db_mode == 'next') {
      obj = db_fetch_mode.next_entry(req.app.locals.activelist, req.app.locals.entry_to_read);
      // set global vars for next-sequential-time-around
      req.app.locals.entry_to_read = obj.entry_to_read;
      debug(obj.entry_to_read);
    } else {
      obj = db_fetch_mode.random_entry(req.app.locals.activelist);
    }
    req.app.locals.db_mode = obj.db_mode;
    debug(req.app.locals.db_mode);
    id = obj.id;
    debug('id to read from activelist: ' + id);
  }).then(() => {
    // use that id to fetch story from db
    collection.findOne({
      _id: id
    }).then( (docs) => {
      debug(JSON.stringify(docs));
      // pass that story to display frontend
      res.render('displays/main', {
        data: docs,
        tabtitle: "LetsFakeNews:Display"
      });
    })
  }).catch((err) => {
    debug(err);
  });
}
