// process roundtrip taking client-JSON, processing word via NLP, listing image-urls via Google-API, returning db-JSON

'use strict'
const debug = require('debug')('process_feedback')
const timeOps = require('../modules/timeOps.js')

module.exports = {

  process: function (feedbackJSON) {
    return new Promise(function (resolve, reject) {
      const today = new Date()
      timeOps.current_time(today).then((result) => {
        debug(result)
        feedbackJSON.time = result.time
        resolve(feedbackJSON)
      }).catch((err) => {
        debug('Err: ', err)
      })
    })
  }

}
