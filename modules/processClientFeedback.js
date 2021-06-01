// receive feedback, timestamp it,  then pass it back for saving to DATABASE

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
