'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/routes/story/remove');
  // remove entry from activelist
  let dbSettings = req.dbSettings;
  dbSettings.activelist = dbSettings.activelist.filter(item => item != req.body._id);
  // delete entry from db
  const query = {
    _id: req.body._id
  };
  debug(req.body._id);
  Story.findOneAndDelete(query).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
    }
  }).then(() => {
    // fetch the db to refresh the frontend
    Story.find({}).then((docs,err) => {
      debug(docs);
      res.json({
        stories: docs
      });
    });
  }).catch((err) => {
    debug("Error: ", err);
  });
}
