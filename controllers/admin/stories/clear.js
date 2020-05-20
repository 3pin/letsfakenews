
const debug = require('debug')('controller');
// import mongoose 'Story' schema
const Story = require('../../../models/story.model');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear');
  /* set the db collection */
  const { room } = req.query;
  const query = { room };
  const { dbSettings } = req;
  /* delete all db entries */
  Story.deleteMany(query).then((docs) => {
    debug(docs);
    // debug(docs.result.n + " document(s) deleted");
    res.send({
      stories: [],
      activelistChange: 0,
      visualise: 0,
    });
  }).then(() => {
    /* empty the active activelist */
    dbSettings.activelist = [];
    dbSettings.entryToRead = 0;
    dbSettingsUpdate(dbSettings, room).then((doc) => {
      debug(doc);
    });
    /* tell visualise-pages about activeListChange */
    const activelistObj = {
      room,
      update: 0,
    }
    bus.emit('activelistChange', activelistObj);
    // bus.emit('activelistChange', 0);
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
