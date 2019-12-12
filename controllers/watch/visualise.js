'use strict';

const debug = require('debug')('routes_watch');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  // use middleware to fetch db settings
  let activelist = req.dbSettings.activelist;
  let visualsAmount = req.dbSettings.visualise;
  let livelist;
  if (visualsAmount < activelist.length) {
    console.log('amount < list');
    livelist = activelist.slice(activelist.length - visualsAmount, activelist.length)
  } else {
    console.log('amount >= list')
    livelist = activelist
  }
  console.log(livelist)
  res.json({
    activelist: activelist,
    visualsAmount: visualsAmount,
    visualsList: livelist
  });
};
