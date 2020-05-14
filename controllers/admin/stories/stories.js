const debug = require('debug')('controller');
// import mongoose 'Story' schema
const Story = require('../../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  debug(req.query.room);
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === req.query.room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  Story.find({
    room: req.query.room,
  }).sort([['_id', 1]]).then((docs) => {
    // res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      stories: docs,
      activelistLength: dbSettings.activelist.length,
      visualise: dbSettings.visualise,
      autolive: dbSettings.autolive,
    });
  });
};
