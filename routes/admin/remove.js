'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

module.exports = (req, res) => {
  debug('/DELETE routes/databases/remove');
  // if entry was active... remove entry from activelist
  req.app.locals.activelist = req.app.locals.activelist.filter(item => item != req.body._id);
  // delete the entry from db
  const query = {
    _id: req.body._id
  };
  debug(req.body._id);
  Story.findOneAndDelete(query).then((docs, err) => {
    if (err) {
      debug('error');
      debug(err);
    } else {
      debug('no error');
      debug(docs);
      //debug(docs.result.n + " document(s) deleted");
    }
  }).then(() => {
    // fetch the db to refresh the frontend
    Story.find({type:'story'}).then((docs,err) => {
      debug(docs);
      res.json({
        stories: docs
      });
    });
  }).catch((err) => {
    debug("Error: ", err);
  });
}
