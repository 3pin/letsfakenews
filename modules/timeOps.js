// a module to calculate time, datetime, and a database-name based on datetime
// returns {time: currentTimeWord, datetime:currentDatetimePrint, dbname:currentDatetimeWord}
// eg. dbname = timeOps.current_time().dbname

'use strict'

const debug = require('debug')('timeOps')

module.exports = {

  current_time: function (systemdate) {
    return new Promise(function (resolve, reject) {
      // declare internal letiables
      const today = systemdate
      let currentDatetimePrint
      let currentDatetimeWord
      let currentTimeWord

      // define methods
      function checkTime (i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
      }

      function pad (n, width, z) {
        z = z || '0'
        n = n + ''
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
      }

      function startTime () {
        return new Promise(function (resolve, reject) {
          const day = pad(today.getDate(), 2)
          const month = pad(today.getMonth() + 1, 2)
          const year = today.getFullYear()
          const h = today.getHours()
          let m = today.getMinutes()
          let s = today.getSeconds()
          // add a zero in front of numbers<10
          m = checkTime(m)
          s = checkTime(s)
          currentDatetimePrint = day + '-' + month + '-' + year + ' ' + h + ':' + m + ':' + s
          currentDatetimeWord = 'db_' + day + '_' + month + '_' + year + '_' + h + '_' + m + '_' + s
          currentTimeWord = h + ':' + m + ':' + s
          const result = {
            time: currentTimeWord,
            datetime: currentDatetimePrint,
            dbname: currentDatetimeWord
          }
          resolve(result)
        }).catch(function (error) {
          debug('Failed!', error)
        })
      }

      startTime().then((result) => {
        resolve(result)
      }).catch(function (error) {
        debug('Failed!', error)
      })
    })
  }
}
