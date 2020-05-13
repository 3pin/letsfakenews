
const debug = require('debug')('controller');
// import mongoose 'Story' schema
const Story = require('../../../models/story.model');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear');
  /* set the db collection */
  debug(req.query.room);
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === req.query.room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  debug(dbSettings);
  const query = { room: req.query.room };
  /* delete all db entries */
  Story.deleteMany(query).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
      // debug(docs.result.n + " document(s) deleted");
    }
    res.send({
      stories: [],
      activelistChange: 0,
      visualise: 0,
    });
  }).then(() => {
    /* empty the active activelist */
    dbSettings.activelist = [];
    dbSettings.entryToRead = 0;
    dbSettingsUpdate(dbSettings);
    /* tell visualise-pages about activeListChange */
    bus.emit('activelistChange', 0);
  }).catch((err) => {
    debug('Err: ', err);
  });
};
