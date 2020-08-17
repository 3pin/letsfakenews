const debug = require('debug')('routes_watch');
const randomCalc = require('../../modules/dbFetchMode');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  let livelist;
  if (req.dbSettings.visualise < req.dbSettings.activelist.length) {
    debug('visualise_amount < activelist');
    livelist = req.dbSettings.activelist.slice(req.dbSettings.activelist.length - req.dbSettings.visualise, req.dbSettings.activelist.length);
  } else {
    debug('visualise_amount >= activelist');
    livelist = req.dbSettings.activelist;
  }
  debug(livelist);
  // pick a random entry from [livelist] and fetch its story
  const { id } = randomCalc.randomEntry(livelist);
  debug(id);
  Story.findById(id, (err, data) => {
    debug(data);
    res.json({
      data,
    });
    debug(err);
  });
};
