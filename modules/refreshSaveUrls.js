/*
GET a document via _id
REFRESH the url field in the document
UPDATE the document in the DB via _id/url
*/

'use strict'
const debug = require('debug')('refresh_save_urls')
const imagesearchIterative = require('../modules/imagesearchIterative.js')
// import mongoose schemas
const Story = require('../models/story.model')

module.exports = {
  process: function (id) {
    debug(id)
    return new Promise((resolve, reject) => {
      Story.findById(id).then(doc => {
        // debug(doc);
        const words = doc.words
        // debug(words);
        imagesearchIterative.process(words).then(result => {
          // debug(result);
          Story.updateOne({
            _id: id
          }, {
            urls: result
          }).then((res) => {
            debug(res)
            resolve(res)
          })
        })
      })
        .catch(error => {
          debug('Failed!', error)
        })
    })
  }
}
