const debug = require('debug')('controller');
// import mongoose 'Story' schema
const Story = require('../../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  const {
    room,
  } = req.query;
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  Story.find({
    room,
  }).sort([['_id', 1]]).then((docs) => {
    res.send({
      stories: docs,
      activelistLength: dbSettings.activelist.length,
      visualise: dbSettings.visualise,
      autolive: dbSettings.autolive,
    });
  });
};
