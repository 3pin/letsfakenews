'use strict';
const debug = require('debug')('index')

const routes = require('express').Router();

const databases = require('./databases');
routes.use('/databases', databases);

const displays = require('./displays');
routes.use('/displays', displays);

// serve homepage /index
routes.get('/', (req, res) => {
  debug('/GET msg to index page')
  res.render('users', {
    tabtitle: "LetsFakeNews:Users"
  });
});

// serve mode-data to client
routes.get('/mode', (req, res) => {
  debug('/GET mode msg')
  res.send(process.env.NODE_ENV);
});


// receive title-story info
routes.post('/add_title_story', (req, res, next) => {
  let client_JSON = req.body
  debug('client_JSON: ' + client_JSON)
  //process JSON... add NLP_words & matching urls
  const process_client_story = require('../modules/process_client_story.js');
  process_client_story.process(client_JSON).then((result) => {
    //save to db
    let collection = req.db.get(process.env.COLLECTION);
    collection.insert(result).then((output) => {
      debug('Document inserted to db successfully');
      //next();
      //res.send('Document inserted to db successfully');
      // fetch the just-saved JSON's _id to add to the sorted-array-of-ids...
      collection.findOne({
        title: output.title
      }).then((data) => {
        let newest_id = data._id
        ordered_ids.push(newest_id)
        //if there is no new_story currently being read then offset the index-to-fetch-from for next-time-around
        if (db_mode == 'old_story') {
          db_mode = 'new_story';
          debug('Switched db_fetch_mode to: ' + db_mode);
          // return no of entries in database
          collection.count({}, {}).then((response) => {
            // offset-1 as it will get incremented in the next_story function anyway
            id_to_read = response - 1
          }).then(() => {
            next();
          })
        }
      });
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}, (req, res) => {
  /* refresh db stories */
  /*
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    debug(docs)
    res.render('database', {
      tabtitle: "LetsFakeNews:database",
      stories: docs
    });
  });
  */
});

// receive title-story info
routes.post('/add_feedback', (req, res) => {
  // Get our form values. These rely on the "name" attributes
  let feedback = req.body.feedback;
  debug('Raw feedback: ' + feedback);
  const process_client_feedback = require('../modules/process_client_feedback.js');
  process_client_feedback.process(feedback).then((result) => {
    debug(result)
    // Save to the DB
    let collection = req.db.get(process.env.FEEDBACK);
    collection.insert(result, function(err, result) {
      if (err) {
        debug(err);
      } else {
        debug('Feedback inserted to db successfully');
        res.send('Feedback inserted to db successfully');
      }
    }).catch((err) => {
      debug("Err: ", err);
    });
  });
});

/* view the db */
routes.get('/database', (req, res) => {
  debug(process.env.COLLECTION)
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    res.render('database', {
      tabtitle: "LetsFakeNews:database",
      stories: docs
    });
  });
});

module.exports = routes;
