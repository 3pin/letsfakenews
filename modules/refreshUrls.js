/*
takes a JSON-obj
extracts its nouns field to an []
via middleware... creates a urls[] per item in nouns[]
replaces the urls field in the JSON
returns the updated JSON-obj
*/

'use strict'
const debug = require('debug')('refresh_urls')
const imagesearchIterative = require('../modules/imagesearchIterative.js')

module.exports = {
  process: function (obj) {
    debug(obj)
    return new Promise(function (resolve, reject) {
      const words = obj.words
      debug(words)
      imagesearchIterative.process(words).then(urls => {
        debug(urls)
        obj.urls = urls
        debug(obj)
        resolve(obj)
      })
    })
  }
}
