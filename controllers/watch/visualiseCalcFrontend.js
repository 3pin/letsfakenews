const debug = require('debug')('controller');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  let liveList;
  const { room } = req.query;
  const { dbSettings } = req;
  debug(room, dbSettings);
  // fetch activelist... ie. all stories with storylive:true
  Story.find({ room, storylive: 'true' }).sort([['_id', 1]]).then((activeStories) => {
    debug(activeStories);
    // create livelist as a subset of activelist via the 'visualise' setting
    if (req.dbSettings.visualise < activeStories.length) {
      // the default... no_stories_to_visualise is < activelist
      debug('amount < list');
      debug(activeStories.length, req.dbSettings.visualise);
      liveList = activeStories.slice(activeStories.length - req.dbSettings.visualise, activeStories.length);
      debug(liveList);
    } else {
      // the exception... no_stories_to_visualise is >= activelist
      debug('amount >= list');
      liveList = activeStories;
      debug(liveList);
    }
    // send to frontend
    res.json({
      liveList,
      textScrollers: dbSettings.textScrollers,
      imageDuration: dbSettings.imageDuration,
      nodeMode: dbSettings.nodeMode,
      corsAnywhere: dbSettings.corsAnywhere,
    });
  });
};
