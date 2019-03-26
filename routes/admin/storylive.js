'use strict';

const debug = require('debug')('routes_admin');
// import mongoose schemas
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  debug('/PUT routes/databases/storylive');
  debug('_id: ' + req.body._id + ' currently set to: ' + req.body.storylive);
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
  const query = {_id: req.body._id};
  Story.findOneAndUpdate(query, {storylive: new_status}, {new: true}).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
    }
  }).then(() => {
    // return updated version of the db to the frontend admin page
    Story.find({}).then((docs) => {
      res.send({
        stories: docs
      });
    });
  }).catch((err) => {
    debug(err);
  });
}
