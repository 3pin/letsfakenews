'use strict';
const debug = require('debug')('index_feedback')

module.exports = (req, res) => {
  // receive title-story info
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
}
