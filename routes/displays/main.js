// public routes into the app

'use strict';

const debug = require('debug')('display')

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

  var db_mode = 'old_story'; //declare the db-read-mode: old_story || new_story
  var ordered_ids = [] // create an array of db_entries sorted by datetime (ie. _id)
  var id_to_read = 0; // id_to_read from above array
  var id // next id to use to fetch a story from db

  // serve story to display-page on startup
  debug('recvd /display /get request')
  // declare db-collection
  let collection = req.db.get(process.env.COLLECTION);
  // populate the array of [entries by ascending timestamp] then pick the first entry
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
        ordered_ids.push(data[object]._id)
      }
      // calculate what the id of the randomly-chosen story is
      const db_fetch_mode = require('../../modules/db_fetch_mode.js');
      id = db_fetch_mode.random_entry(ordered_ids).id
      // fetch that randomly-chosen story-OBJ and pass to display-client
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          res.render('main', {
            data: data,
            tabtitle: "LetsFakeNews:Display"
          });
        }
      });
    }
  });
};

/*
// serve story to displaypage when-previous-story-finished
app.get('/request_new_story', (req, res) => {
  debug('/GET request_new_story')
  // Set our collection
  let collection = req.db.get(process.env.COLLECTION);
  // calculate what the id of the next story is and any necessary changes fo db_mode
  const db_fetch_mode = require('../modules/db_fetch_mode.js');
  if (db_mode == 'old_story') {
    // calculate what the id of the randomly-chosen story is
    id = db_fetch_mode.random_entry(ordered_ids).id
  } else {
    id = db_fetch_mode.next_entry(ordered_ids, id_to_read).id
    db_mode = db_fetch_mode.next_entry(ordered_ids, id_to_read).db_mode
    id_to_read = db_fetch_mode.next_entry(ordered_ids, id_to_read).id_to_read
  }
  // return the JSON from db
  collection.findOne({
    _id: id
  }, function(err, data) {
    if (err) {
      debug(err)
    } else {
      res.send(data);
    }
  });
});
*/
