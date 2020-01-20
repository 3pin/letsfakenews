'use strict';

const debug = require('debug')('routes_admin');
const refresh_save_urls_iterative = require('../../modules/refresh_save_urls_iterative.js');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/routes/databases/refresh');
  refresh_save_urls_iterative.process().then((result) => {
    debug(result);
    //res.redirect('/admin/stories');
  }).then(() => {
    res.send({
      res: 'All documents url-fields have been refreshed'
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
