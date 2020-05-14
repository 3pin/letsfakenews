
const debug = require('debug')('controller');
/* import mongoose schemas */
const Story = require('../../../models/story.model');
/* import function */
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
/* tap into an sse event-bus */
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('PUT: /routes/admin/storylive');
  const { _id } = req.body.data;
  const { newStorylive } = req.body.data;
  const { room } = req.query;
  debug(_id, newStorylive, room);
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  if (newStorylive === true) {
    debug(`newStoryLive true: ${newStorylive}`);
    /* add to activelist */
    dbSettings.activelist.push(_id);
    dbSettings.entryToRead = dbSettings.activelist.length - 1;
    dbSettings.dbMode = 'next';
  } else {
    debug(`newStoryLive false: ${newStorylive}`);
    /* remove from activelist */
    dbSettings.activelist = dbSettings.activelist.filter((item) => item != _id);
    debug(`activelist:${dbSettings.activelist.length} VS... visualise-amount:${dbSettings.visualise}`);
    /* check if activelist.length < visualise.length */
    if (dbSettings.activelist.length <= dbSettings.visualise) {
      debug(`activelist:${dbSettings.activelist.length} is <= visualise-amount:${dbSettings.visualise}`);
      dbSettings.visualise = dbSettings.activelist.length;
    }
  }
  // update db.Settings.schema
  dbSettingsUpdate(dbSettings, room).then((doc) => {
    debug(`db updated to: ${doc}`);
    bus.emit('activelistChange', dbSettings.activelist.length);
  });
  /* update db storylive entry */
  Story.findByIdAndUpdate(_id, {
    storylive: newStorylive,
  }).then(() => {
    /* send new db to frontend to update REACT state */
    Story.find({ room }).sort([['_id', 1]]).then((docs) => {
      // debug(docs);
      res.send({
        stories: docs,
        activelistLength: dbSettings.activelist.length,
        visualise: dbSettings.visualise,
      });
    });
  }).catch((err) => {
    debug(err);
  });
};
