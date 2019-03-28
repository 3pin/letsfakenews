'use strict';
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// import mongoose schemas
const Feedback = require('../../models/feedback.model');

module.exports = (req, res) => {
  debug('/POST routes/add_feedback');
  // Get our form values. These rely on the "name" attributes
  let client_JSON = req.body;
  const process_client_feedback = require('../../modules/process_client_feedback.js');
  process_client_feedback.process(client_JSON).then((result) => {
    debug('About to save to db');
    // Save to the DB
    let feedback = new Feedback({ ...result
    });
    feedback.save()
      .then((output) => {
        debug('Document inserted to db_feedback successfully');
        res.send('Feedback inserted into database successfully');
      }).then(() => {
        debug('Refreshing the feedback-admin-frontend');
        // fetch the updated db
        Feedback.find({}).then((docs) => {
          // tell eventbus about a new-feedback to trigger refresh of admin-frontend
          bus.emit('feedback', docs);
          debug('SSE event triggered by New_Feedback');
        });
      }).catch((err) => {
        debug("Err: ", err);
      });
  });
}
