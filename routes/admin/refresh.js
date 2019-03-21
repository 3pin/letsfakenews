'use strict';

const debug = require('debug')('routes_admin');
const refresh_urls_iterative = require('../../modules/refresh_urls_iterative.js');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/PUT routes/databases/refresh');
  /* fetch the db entries */
  // return the empty db to the frontend
  Story.find({}).then((docs,err) => {
    //bulk replace the collection
    debug(docs);

    refresh_urls_iterative.process(docs).then((result) => {
      Story.updateMany({},{result},{multi:true});
      //Story.insertMany(result);
    }).then(() => {
      res.send({RefreshStatus: 'Refresh of all images completed'});
    });

  }).catch((err) => {
    debug("Err: ", err);
  });
}
