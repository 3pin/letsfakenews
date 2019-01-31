//a module to calculate time, datetime, and a database-name based on datetime
// returns {time: current_time_word, datetime:current_datetime_print, dbname:current_datetime_word}
// eg. dbname = time_ops.current_time().dbname

'use strict';

const debug = require('debug')('time_ops')

module.exports = {

  current_time: function(systemdate) {
    return new Promise(function(resolve, reject) {

      // declare internal letiables
      let today = systemdate;
      let current_datetime_print
      let current_datetime_word
      let current_time_word

      //define methods
      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }

      function startTime() {
        return new Promise(function(resolve, reject) {
          let day = pad(today.getDate(), 2);
          let month = pad(today.getMonth() + 1, 2);
          let year = today.getFullYear();
          let h = today.getHours();
          let m = today.getMinutes();
          let s = today.getSeconds();
          // add a zero in front of numbers<10
          m = checkTime(m);
          s = checkTime(s);
          current_datetime_print = day + "-" + month + "-" + year + " " + h + ":" + m + ":" + s;
          current_datetime_word = "db_" + day + "_" + month + "_" + year + "_" + h + "_" + m + "_" + s;
          current_time_word = h + ":" + m + ":" + s;
          let result = {
            time: current_time_word,
            datetime: current_datetime_print,
            dbname: current_datetime_word
          };
          resolve(result)
        }).catch(function(error) {
          debug("Failed!", error);
        });
      }

      startTime().then((result) => {
        resolve(result)
      }).catch(function(error) {
        debug("Failed!", error);
      });
    });
  }
};
