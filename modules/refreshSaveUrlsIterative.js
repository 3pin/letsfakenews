/*
takes an array ids that reference DB-documents
iteratively passes on each id for its url field to be refreshed/saved
*/

'use strict'
const debug = require('debug')('refreshSaveUrlsIterative')
const refreshSaveUrls = require('../modules/refreshSaveUrls.js')
const Story = require('../models/story.model')

module.exports = {

  // for an array of nouns: find an image-url to match a noun
  process: function () {
    return new Promise((resolve, reject) => {
      const idArray = []
      Story.find({}).sort([['_id', 1]]).then((docs, err) => {
        // bulk replace the collection
        debug(docs)
        docs.forEach((entry) => { idArray.push(entry._id) })
        debug(idArray)
      }).then(() => {
        var promises = idArray.map(refreshSaveUrls.process)
        Promise.all(promises).then((result) => {
          debug(result)
          resolve(result)
        }).catch((error) => {
          debug('Failed!', error)
        })
      })
    })
  }
}
