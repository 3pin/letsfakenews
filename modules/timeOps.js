// a module to calculate time, datetime, and a database-name based on datetime
// returns {time: currentTimeWord, datetime:currentDatetimePrint, dbname:currentDatetimeWord}
// eg. dbname = timeOps.current_time().dbname

const debug = require('debug')('timeOps');

module.exports = {

  current_time(systemdate) {
    // declare internal variables
    const today = systemdate;
    let currentDatetimePrint;
    let currentDatetimeWord;
    let currentTimeWord;

    // define methods
    function checkTime(time) {
      let i = time;
      if (i < 10) {
        i = `0${i}`;
      }
      return i;
    }

    function pad(n, width, z) {
      const innerZ = z || '0';
      const innerN = `${n}`;
      return innerN.length >= width ? innerN : new Array(width - innerN.length + 1).join(innerZ) + innerN;
    }

    function startTime() {
      return new Promise(((resolve) => {
        const day = pad(today.getDate(), 2);
        const month = pad(today.getMonth() + 1, 2);
        const year = today.getFullYear();
        const h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        currentDatetimePrint = `${day}-${month}-${year} ${h}:${m}:${s}`;
        currentDatetimeWord = `db_${day}_${month}_${year}_${h}_${m}_${s}`;
        currentTimeWord = `${h}:${m}:${s}`;
        const result = {
          time: currentTimeWord,
          datetime: currentDatetimePrint,
          dbname: currentDatetimeWord,
        };
        resolve(result);
      })).catch((error) => {
        debug('Failed!', error);
      });
    }

    return new Promise(((resolve) => {
      startTime().then((result) => {
        resolve(result);
      }).catch((error) => {
        debug('Failed!', error);
      });
    }));
  },
};
