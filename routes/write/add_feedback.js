'use strict';
const debug = require('debug')('users/feedback');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST routes/add_feedback')
  // Get our form values. These rely on the "name" attributes
  let client_JSON = req.body;
  debug(client_JSON);
  const process_client_feedback = require('../../modules/process_client_feedback.js');
  process_client_feedback.process(client_JSON).then((result) => {
    debug('About to save to db');
    // Save to the DB
    let collection = req.db.get(process.env.FEEDBACK);
    collection.insert(result).then((output) => {
      debug('Document inserted to db_feedback successfully');
      res.send('Feedback inserted into database successfully');
    }).then(() => {
      debug('Refreshing the feedback-admin-frontend');
      // print out the new shortened db
      collection.find({}, {
        sort: {
          _id: 1
        }
      }, (err, docs) => {
        //if autolive is TRUE, then new-story should be auto added to activelist
        if (req.app.locals.autolive == true) {
          req.app.locals.activelist.push(docs[docs.length - 1]._id);
          req.app.locals.entry_to_read = req.app.locals.activelist.length - 1;
          req.app.locals.db_mode = 'next';
          debug(req.app.locals.activelist);
          debug(req.app.locals.entry_to_read);
        }
        // tell eventbus about a new-feedback to trigger refresh of admin-frontend
        bus.emit('feedback', {
          new_entry: docs[docs.length - 1]
        });
        debug('SSE event triggered by New_Feedback');
      });
    }).catch((err) => {
      debug("Err: ", err);
    });
  });
}
