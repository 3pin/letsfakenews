'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  debug(req.dbSettings.visualise)
  let dbSettings = req.dbSettings;
  //debug(req.dbSettings);
  Story.find({}).sort([['_id', 1]]).then((docs) => {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      stories: docs,
      activelistLength: dbSettings.activelist.length,
      visualise: dbSettings.visualise,
      autolive: dbSettings.autolive,
    });
  });
};
