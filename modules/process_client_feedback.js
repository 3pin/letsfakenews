// process roundtrip taking client-JSON, processing word via NLP, listing image-urls via Google-API, returning db-JSON

'use strict';
const debug = require('debug')('process_client_feedback');
const time_ops = require('../modules/time_ops.js');

module.exports = {

  process: function(feedback) {
    return new Promise(function(resolve, reject) {
      let feedbackJSON = {};
      feedbackJSON.feedback = feedback;
      let today = new Date();
      time_ops.current_time(today).then((result) => {
        feedbackJSON.time = result.time;
        resolve(result);
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }

}
