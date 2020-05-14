/*
takes an array ids that reference DB-documents
iteratively passes on each id for its url field to be refreshed/saved
*/


const debug = require('debug')('module');
const refreshSaveUrls = require('./refreshSaveUrls.js');
const Story = require('../models/story.model');

module.exports = {

  // for an array of nouns: find an image-url to match a noun
  process(room) {
    return new Promise((resolve, reject) => {
      const idArray = [];
      Story.find({ room }).sort([['_id', 1]]).then((docs) => {
        // bulk replace the collection
        debug(docs);
        docs.forEach((entry) => { idArray.push(entry._id); });
        debug(idArray);
      }).then(() => {
        const promises = idArray.map(refreshSaveUrls.process);
        Promise.all(promises).then((result) => {
          debug(result);
          resolve(result);
        }).catch((error) => {
          debug('Failed!', error);
          reject(error)
        });
      });
    });
  },
};
