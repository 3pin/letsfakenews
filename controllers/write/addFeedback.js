
const debug = require('debug')('controller');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');
// import mongoose schemas
const Feedback = require('../../models/feedback.model');

const processClientFeedback = require('../../modules/processClientFeedback.js');

module.exports = (req, res) => {
  debug('/POST routes/add_feedback');
  // Get our form values. These rely on the "name" attributes
  const { room } = req.query;
  const clientJSON = req.body;
  clientJSON.room = room;
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
        Feedback.find({}).then((feedbacks) => {
          // tell eventbus about a new-feedback to trigger refresh of admin-frontend
          const feedbackObj = {
            room,
            feedbacks,
          }
          /* tell eventbus about a new-story to trigger refresh of admin-frontend */
          bus.emit('feedback', feedbackObj);
          // bus.emit('feedback', docs);
          debug('SSE event triggered by New_Feedback');
        });
      }).catch((err) => {
        debug('Err: ', err);
        res.status(500).json({
          message: 'DB_ERROR',
        });
      });
  });
};
