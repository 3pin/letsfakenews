'use strict';

const debug = require('debug')('routes_watch');
const randomCalc = require('../../modules/db_fetch_mode');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  // use middleware to fetch db settings
  let activelist = req.dbSettings.activelist;
  let visualise = req.dbSettings.visualise;
  let livelist;
  if (visualise < activelist.length) {
    console.log('amount < list');
    livelist = activelist.slice(activelist.length - visualise, activelist.length);
  } else {
    console.log('amount >= list');
    livelist = activelist;
  }
  console.log(livelist);
  // pick a random entry from [livelist] and fetch its story
  //
  let id = randomCalc.random_entry(livelist).id;
  debug(id);
  Story.findById(id, (err, data) => {
    debug(data);
    res.json({
      data: data
    });
  })
  /*
  res.json({
    activelist: activelist,
    visualise: visualise,
    visualsList: livelist
  });
  */
};
