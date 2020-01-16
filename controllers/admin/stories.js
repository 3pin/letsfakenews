'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  let dbSettings = req.dbSettings;
  debug(dbSettings.visualise)
  //debug(dbSettings);
  Story.find({}).sort([['_id', 1]]).then((docs) => {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      stories: docs,
      activelistChange: dbSettings.activelist.length,
      visualise: dbSettings.visualise,
      autolive: dbSettings.autolive,
    });
  });
};
