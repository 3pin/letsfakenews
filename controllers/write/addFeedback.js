
const debug = require('debug')('routes_write');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// import mongoose schemas
const Feedback = require('../../models/feedback.model');

const processClientFeedback = require('../../modules/processClientFeedback.js');

module.exports = (req, res) => {
  debug('/POST routes/add_feedback');
  // Get our form values. These rely on the "name" attributes
  const clientJSON = req.body;
  processClientFeedback.process(clientJSON).then((result) => {
    debug('About to save to db');
    // Save to the DB
    const feedback = new Feedback({ ...result });
    feedback.save()
      .then(() => {
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
        debug('Err: ', err);
      });
  });
};
