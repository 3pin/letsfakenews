// process roundtrip taking client-JSON, processing word via NLP, listing image-urls via Google-API, returning db-JSON

const debug = require('debug')('process_feedback');
const timeOps = require('./timeOps.js');

module.exports = {

  process(feedback) {
    const feedbackJSON = feedback
    return new Promise(((resolve) => {
      const today = new Date();
      timeOps.current_time(today).then((result) => {
        debug(result);
        feedbackJSON.time = result.time;
        resolve(feedbackJSON);
      }).catch((err) => {
        debug('Err: ', err);
      });
    }));
  },

};
