// check the env
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  const dotEnvPath = path.resolve('./.env');
  require('dotenv').config({
    path: dotEnvPath
  });
}
var debug = require('debug')('index')
debug('Port:' + process.env.PORT + ' mode:' + process.env.NODE_ENV + ' client_mode:' + process.env.CLIENT_DEBUG_MODE + ' db_uri:' + process.env.MONGODB_URI + ' db_collection:' + process.env.COLLECTION + ' db_feedback:' + process.env.FEEDBACK)

// load middle-ware modules
const time_ops = require('../modules/time_ops.js');

// authorization
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
const express = require('express');
const router = express.Router();

//read-mode, new_story || random_story
let db_mode = 'new_story';
// array of the entry_times of each database entry
let db_entry_times;
// db entry to read
let entry_to_read;
// newest_entry_read
let newest_entry_read = 0;

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
  res.send(process.env.CLIENT_DEBUG_MODE);
});

// serve new_story to displaypage (pass it db-data)
router.get('/request_new_story', (req, res) => {
  debug('/GET request_new_story')
  // set our internal DB variable
  let db = req.db;
  // Set our collection
  const collection = db.get(process.env.COLLECTION);
  // return an array with the list of all the '_id' in the test_collection
  collection.find({}, {
    fields: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug(err);
    } else {
      // create an array of all the '_ids' in the collection
      db_entry_times = data;
      //check mode
      if (db_mode == 'new_story') {
        debug('Using mode: ' + db_mode)
        newest_entry_read++;
        entry_to_read = newest_entry_read;
        if (entry_to_read == db_entry_times.length - 1) {
          db_mode = 'random_story'
          debug('Mode switch: ' + db_mode)
          //newest_entry_read = db_entry_times.length-1;
        }
      } else if (db_mode == 'random_story') {
        debug('Using mode: ' + db_mode)
        // pick a random entry with which to pick an '_id' entry from the array
        let randomnumber = Math.floor(Math.random() * (db_entry_times.length));
        entry_to_read = randomnumber
      }
      let display_num = entry_to_read + 1
      debug('About to read entry:' + display_num + ' of:' + db_entry_times.length)
      let query = db_entry_times[entry_to_read];
      let id = query._id
      //increment the db_entry to read for next time around
      // return the randomly-picked JSON from the db
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          debug(data.title)
          // parse and send data to client html display-page
          res.send(data);
        }
      });
    }
  });
  /*
  res.render('index', {
    tabtitle: "LetsFakeNews"
  });
  */
  //res.send(process.env.MODE);
});

// serve display page (pass it db-data)
router.get('/display', middleware_auth, (req, res) => {
  debug('recvd /display /get request')
  // set our internal DB variable
  let db = req.db;
  // Set our collection
  const collection = db.get(process.env.COLLECTION);
  // return an array with the list of all the '_id' in the test_collection
  collection.find({}, {
    fields: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug(err);
    } else {
      // create an array of all the '_ids' in the collection
      db_entry_times = data;
      //check mode
      if (db_mode == 'new_story') {
        debug('Using mode: ' + db_mode)
        newest_entry_read = db_entry_times.length - 1;
        entry_to_read = newest_entry_read;
        if (entry_to_read == db_entry_times.length - 1) {
          db_mode = 'random_story'
          debug('Mode switch: ' + db_mode)
          //newest_entry_read = db_entry_times.length-1;
        }
      } else if (db_mode == 'random_story') {
        debug('Using mode: ' + db_mode)
        // pick a random entry with which to pick an '_id' entry from the array
        let randomnumber = Math.floor(Math.random() * (db_entry_times.length));
        entry_to_read = randomnumber
      }
      let display_num = entry_to_read + 1
      debug('About to read entry:' + display_num + ' of:' + db_entry_times.length)
      let query = db_entry_times[entry_to_read];
      let id = query._id
      /*
      //increment the db_entry to read for next time around
      if (entry_to_read < db_entry_times.length - 1) {
        entry_to_read++
      } else {
        entry_to_read = 0;
      }
      */
      // return the randomly-picked JSON from the db
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          // parse and send data to client html display-page
          res.render('display', {
            data: data,
            tabtitle: "LetsFakeNews:Display"
          });
        }
      });
    }
  });
});

// receive title-story info
router.post('/add_title_story', (req, res) => {
  //variables to be set and later saved to a database
  let client_JSON = req.body
  //process JSON adding words & urls
  const process_client_module = require('../modules/process_client_module.js');
  process_client_module.process(client_JSON).then(function(result) {
    //save JSON to database
    let jsonObj = result
    let str = JSON.stringify(jsonObj, null, 2); // spacing level = 2
    debug('jsonObj: ' + str)
    // set our internal DB variable
    let db = req.db;
    // Set our collection
    const collection = db.get(process.env.COLLECTION);
    // save to database
    collection.insert(jsonObj, function(err, result) {
      if (err) {
        debug(err);
      } else {
        debug('Document inserted to db successfully');
        db_mode = 'new_story';
        debug('Mode switch: ' + db_mode);
        // return no of entries in database
        collection.count({}, {}, function(err, data) {
          if (err) {
            debug(err);
          } else {
            let no_db_entries = data;
            debug('Total number of db_entries now: ' + no_db_entries)
          }
        });
        /*
        // return an array with the list of all the '_id' in the test_collection
        collection.find({}, {
          fields: {
            _id: 1
          }
        }, function(err, data) {
          if (err) {
            debug(err);
          } else {
            db_entry_times = data;
            debug('Total number of db_entries now: ' + db_entry_times.length)
          }
        });
        */
      }
    });
  }).catch(done)
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
  const collection = db.get(process.env.FEEDBACK);
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
