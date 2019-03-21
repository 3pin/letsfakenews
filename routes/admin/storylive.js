'use strict';

const debug = require('debug')('routes_admin');
// import mongoose schemas
const Master = require('../../models/master.model');
const Story = require('../../models/story.model');

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  debug('/PUT routes/databases/storylive');
  debug('_id: ' + req.body._id);
  debug('Currently set to: ' + req.body.storylive);
  debug(req.body.storylive);
  // if checkbox is true/false... add/remove from activelist
  var new_status;
  if (req.body.storylive === true) {
    debug('Setting to FALSE');
    new_status = false
    req.app.locals.activelist = req.app.locals.activelist.filter(item => item != req.body._id);
    req.app.locals.activelist.forEach(function (item, index) {
      debug(item);
    });
  } else {
    debug('Setting to TRUE');
    new_status = true;
    req.app.locals.activelist.push(req.body._id);
    req.app.locals.entry_to_read = req.app.locals.activelist.length - 1;
    req.app.locals.db_mode = 'next';
    debug(`db_mode: ${req.app.locals.db_mode}`);
    debug(`entry_to_read: ${req.app.locals.entry_to_read}`);
    req.app.locals.activelist.forEach(function (item, index) {
      debug(item);
    });
  }
  //update database so the frontend continues to reflect status of the checbox
  Master.findByIdAndUpdate(req.app.locals.dbId.stories.req.body._id,{storylive: new_status},{new:true}).then((docs,err) => {
  //Story.findByIdAndUpdate(req.body._id,{storylive: new_status},{new:true}).then((docs,err) => {
    if (err) {
      debug('error');
      debug(err);
    } else {
      debug('no error');
      debug(docs);
    }
  }).then(() => {
    // return updated version of the db to the frontend admin page
    Master.findById(req.app.locals.dbId)
    .then((docs) => {
      // populate an array of _id's
      let db_ids = [];
      let object
      for (object in docs.stories) {
        db_ids.push(docs.stories[object]._id);
        debug('[db_ids] _id: ' + docs.stories[object]._id);
      }
      debug('[db_ids] total_length: ' + db_ids.length);
      res.json({
        stories: docs.stories
      });
    });
  }).catch((err) => {
    debug(err);
  });
}
