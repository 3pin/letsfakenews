//a module to calculate time, datetime, and a database-name based on datetime
// returns {time: current_time_word, datetime:current_datetime_print, dbname:current_datetime_word}
// eg. dbname = time_ops.current_time().dbname

module.exports = {

  current_time: function() {
    // declare internal variables
    var current_datetime_print
    var current_datetime_word
    var current_time_word

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
      var today = new Date();
      var day = pad(today.getDate(), 2);
      var month = pad(today.getMonth() + 1, 2);
      var year = today.getFullYear();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      // add a zero in front of numbers<10
      m = checkTime(m);
      s = checkTime(s);
      current_datetime_print = day + "-" + month + "-" + year + " " + h + ":" + m + ":" + s;
      current_datetime_word = "db_" + day + "_" + month + "_" + year + "_" + h + "_" + m + "_" + s;
      current_time_word = h + ":" + m + ":" + s;
      t = setTimeout(function() {
        startTime()
      }, 500);
    }
    startTime();

    //declare how outside-world can receive returned variables
    return {
      time: current_time_word,
      datetime: current_datetime_print,
      dbname: current_datetime_word
    }
  }
};
