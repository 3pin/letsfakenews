/*
takes an array ids that reference DB-documents
iteratively passes on each id for its url field to be refreshed/saved
*/

'use strict';
const debug = require('debug')('refresh_save_urls_iterative');
const refresh_save_urls = require('../modules/refresh_save_urls.js');
const Story = require("../models/story.model");

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  process: function () {
    return new Promise((resolve, reject) => {
      let idArray = [];
      Story.find({}).sort([['_id', 1]]).then((docs, err) => {
        //bulk replace the collection
        debug(docs);
        docs.forEach((entry) => {idArray.push(entry._id)});
        debug(idArray);
      }).then(() => {
        var promises = idArray.map(refresh_save_urls.process)
        Promise.all(promises).then((result) => {
          debug(result);
          resolve(result);
        }).catch((error) => {
          debug("Failed!", error);
        });
      })
    });
  }
};
