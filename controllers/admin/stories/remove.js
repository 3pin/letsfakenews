
const debug = require('debug')('controller');
// load update module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// import mongoose 'Story' schema
const Story = require('../../../models/story.model');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/routes/story/remove');
  // remove entry from activevisualiselist in dB
  const { _id } = req.query;
  const { room } = req.query;
  debug(_id, room);
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  // debug(dbSettings);
  debug(dbSettings.activelist);
  dbSettings.activelist = dbSettings.activelist.filter((item) => item != _id);
  debug(dbSettings.activelist);
  // offset the next-story-to-read to account for deleted entry
  dbSettings.entryToRead -= 1;
  dbSettingsUpdate(dbSettings).then((docs) => {
    debug(docs);
  });
  // delete entry from acreq.tual db
  // const query = { room: room, __type: 'Story' };
  const query = { _id };
  Story.findOneAndDelete(query).then((docs) => {
    debug(docs);
  }).then(() => {
    // fetch the db to refresh the frontend
    Story.find({ room }).sort([['_id', 1]]).then((docs) => {
      debug(docs);
      /* tell visualise-pages about activeListChange */
      bus.emit('activelistChange', dbSettings.activelist.length);
      /* check if activelist.length < visualise.length */
      if (dbSettings.activelist.length <= dbSettings.visualise) {
        debug(`activelist:${dbSettings.activelist.length} is less than visualise amount:${dbSettings.visualise}`);
        dbSettings.visualise = dbSettings.activelist.length;
        dbSettingsUpdate(dbSettings)
      }
      res.send({
        stories: docs,
        activelistChange: dbSettings.activelist.length,
        visualise: dbSettings.visualise,
      });
    });
  }).catch((err) => {
    debug('Error: ', err);
  });
};
