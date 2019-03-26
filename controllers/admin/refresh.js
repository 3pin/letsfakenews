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
    let idArray = [];
    docs.forEach((entry) => {idArray.push(entry._id)});
    refresh_save_urls_iterative.process(idArray).then((result,err) => {
      debug(result);
      res.send({res:'All documents url-fields have been refreshed'});
      //res.redirect('/admin/stories');
    }).catch((err) => {
      debug("Err: ", err);
    });
  })
}
