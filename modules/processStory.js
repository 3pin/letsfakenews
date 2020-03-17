/*
receive a story as a string
process story for nouns
process nouns for URLs
return urls
*/

'use strict'
const debug = require('debug')('story')
const nlp = require('../modules/nlp.js')
const imagesearchIterative = require('../modules/imagesearchIterative.js')

module.exports = {

  process: function (inputStory) {
    return new Promise(function (resolve, reject) {
      const story = inputStory
      nlp.parse_nouns(story).then(nouns => {
        imagesearchIterative.process(nouns).then(urls => {
          resolve(urls)
        })
      }).catch((err) => {
        debug('Err: ', err)
      })
    })
  }
}
