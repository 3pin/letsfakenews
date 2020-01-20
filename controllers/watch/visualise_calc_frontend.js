'use strict';

const debug = require('debug')('routes_watch');
const randomCalc = require('../../modules/db_fetch_mode');
const Story = require('../../models/story.model');
const mongoose = require('mongoose');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  let liveList;
  // fetch activelist... ie. all stories with storylive:true
  Story.find({"storylive":"true"}).sort([['_id', 1]]).then((activeStories) => {
    debug(activeStories);
    // create livelist as a subset of activelist via the 'visualise' setting
    if (req.dbSettings.visualise < activeStories.length) {
      // the default... no_stories_to_visualise is < activelist
      console.log('amount < list');
      liveList = activeStories.slice(activeStories.length - req.dbSettings.visualise, activeStories.length);
    } else {
      // the exception... no_stories_to_visualise is >= activelist
      console.log('amount >= list');
      liveList = activeStories;
    }
    // send to frontend
    res.json({
      liveList: liveList
    });
  });
};
