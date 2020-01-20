'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  debug(req.dbSettings.visualise)
  //debug(req.dbSettings);
  Story.find({}).sort([['_id', 1]]).then((docs) => {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      stories: docs,
      activelistChange: req.dbSettings.activelist.length,
      visualise: req.dbSettings.visualise,
      autolive: req.dbSettings.autolive,
    });
  });
};
