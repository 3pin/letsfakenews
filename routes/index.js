// public routes into the app

const debug = require('debug')('index')
const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});
const express = require('express');
const router = express.Router();
const time_ops = require('../modules/time_ops.js');
function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  //return next()
}

debug('Port:' + process.env.PORT + ' mode:' + process.env.NODE_ENV + ' db_uri:' + process.env.MONGODB_URI + ' db_collection:' + process.env.COLLECTION + ' db_feedback:' + process.env.FEEDBACK)

//declare the db-read-mode: old_story || new_story
let db_mode = 'old_story';
// create an array of db_entries sorted by datetime (ie. _id)
let ordered_ids = []
// id_to_read from above array
let id_to_read = 0;
// next id to use to fetch a story from db
let id

// serve homepage /index
router.get('/', (req, res) => {
  debug('/GET msg to index page')
  res.render('index', {
    tabtitle: "LetsFakeNews:Input"
  });
  //res.send(process.env.MODE);
});

// serve mode-data to a client
router.get('/mode', (req, res) => {
  debug('/GET mode msg')
  res.send(process.env.NODE_ENV);
});

// serve story to display-page on startup
router.get('/display', middleware_auth, (req, res) => {
  debug('recvd /display /get request')
  // declare db
  let db = req.db;
  // declare db-collection
  let collection = db.get(process.env.COLLECTION);
  // populate the array of [entries by ascending timestamp] then pick the first entry
  collection.find({}, {
    sort: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug(err);
    } else {
      for (object in data) {
        ordered_ids.push(data[object]._id)
      }
      // calculate what the id of the randomly-chosen story is
      const db_fetch_mode = require('../modules/db_fetch_mode.js');
      id = db_fetch_mode.random_entry(ordered_ids).id
      // fetch that randomly-chosen story-OBJ and pass to display-client
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          res.render('display', {
            data: data,
            tabtitle: "LetsFakeNews:Display"
          });
        }
      });
    }
  });
});

// serve story to displaypage when-previous-story-finished
router.get('/request_new_story', (req, res) => {
  debug('/GET request_new_story')
  // set our internal DB variable
  let db = req.db;
  // Set our collection
  let collection = db.get(process.env.COLLECTION);
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

// receive title-story info
router.post('/add_title_story', (req, res) => {
  let client_JSON = req.body
  debug('client_JSON: ' + client_JSON)
  //process JSON adding words & urls
  const process_client_module = require('../modules/process_client_module.js');
  process_client_module.process(client_JSON).then((result) => {
    let str = JSON.stringify(result, null, 2);
    debug('jsonOBJ returned from processing: ' + str)
    //save JSON to database
    let db = req.db;
    let collection = db.get(process.env.COLLECTION);
    collection.insert(result, function(err, result) {
      if (err) {
        debug(err);
      } else {
        debug('Document inserted to db successfully');
        debug(result);
        res.send('Document inserted to db successfully');
        // add the just-saved JSON's _id then add it to the sorted-array-of-ids...
        collection.findOne({
          title: result.title
        }, function(err, data) {
          if (err) {
            debug(err)
          } else {
            let newest_id = data._id
            ordered_ids.push(newest_id)
            //if there is no new_story currently being read then offset the index-to-fetch-from for next-time-around
            if (db_mode == 'old_story') {
              db_mode = 'new_story';
              debug('Switched db_fetch_mode to: ' + db_mode);
              // return no of entries in database
              collection.count({}, {}, function(err, data) {
                if (err) {
                  debug(err);
                } else {
                  // offset-1 as it will get incremented in the next_story function anyway
                  id_to_read = data - 1
                }
              });
            }
          }
        });
      }
    });
  });
});

// receive title-story info
router.post('/add_feedback', (req, res) => {
  //
  // Get our form values. These rely on the "name" attributes
  let feedback = req.body.feedback;
  debug('Raw feedback: ' + feedback);
  //
  // save to database
  // create JSON obj with our data
  let jsonObj = {}
  jsonObj.time = time_ops.current_time().datetime
  jsonObj.fedback = feedback
  // set our internal DB variable
  let db = req.db;
  // Set our collection
  let collection = db.get(process.env.FEEDBACK);
  // Submit to the DB
  collection.insert(jsonObj, function(err, result) {
    if (err) {
      debug(err);
    } else {
      debug('Feedback inserted to db successfully');
    }
  });
});

module.exports = router;
