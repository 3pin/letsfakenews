'use strict';

const debug = require('debug')('routes_watch');
const randomCalc = require('../../modules/db_fetch_mode');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  let livelist;
  if (req.dbSettings.visualise < req.dbSettings.activelist.length) {
    console.log('amount < list');
    livelist = req.dbSettings.activelist.slice(req.dbSettings.activelist.length - req.dbSettings.visualise, req.dbSettings.activelist.length);
  } else {
    console.log('amount >= list');
    livelist = req.dbSettings.activelist;
  }
  console.log(livelist);
  // pick a random entry from [livelist] and fetch its story
  let id = randomCalc.random_entry(livelist).id;
  debug(id);
  Story.findById(id, (err, data) => {
    debug(data);
    res.json({
      data: data
    });
  })
};
