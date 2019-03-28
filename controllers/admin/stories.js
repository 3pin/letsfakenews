'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  let dbSettings = req.dbSettings;
  Story.find({}).then((docs) => {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      autolive: dbSettings.autolive,
      stories: docs
    });
  });
};
