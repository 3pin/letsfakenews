'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  debug(req.app.locals.autolive);
  Story.find({}).then((docs) => {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      autolive: req.app.locals.autolive,
      stories: docs
    });
  });
};
