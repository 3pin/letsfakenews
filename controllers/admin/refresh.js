'use strict';

const debug = require('debug')('routes_admin');
const refresh_save_urls_iterative = require('../../modules/refresh_save_urls_iterative.js');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/routes/databases/refresh');
  //fetch the array of story _id's
  Story.find({}, '_id').then((docs, err) => {
    //bulk replace the collection
    debug(docs);
    let idArray = [];
    docs.forEach((entry) => {idArray.push(entry._id)});
    debug(idArray);
    refresh_save_urls_iterative.process(idArray).then((result) => {
      debug(result);
      //res.redirect('/admin/stories');
    }).then(() => {
      res.send({res:'All documents url-fields have been refreshed'});
    }).catch((err) => {
      debug("Err: ", err);
    });
  })
}
