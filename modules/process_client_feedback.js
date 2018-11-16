// process roundtrip taking client-JSON, processing word via NLP, listing image-urls via Google-API, returning db-JSON

'use strict';
const debug = require('debug')('process_client_feedback');
const time_ops = require('../modules/time_ops.js');

module.exports = {

  process: function(feedback) {
    let feedbackJSON = {};
    feedbackJSON.feedback = feedback;
    return new Promise(function(resolve, reject) {
      let today = new Date();
      time_ops.current_time(today).then((result) => {
        feedbackJSON.time = result.time;
        resolve(feedbackJSON);
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }

}
