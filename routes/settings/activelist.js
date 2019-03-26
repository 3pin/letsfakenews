'use strict';

const debug = require('debug')('routes_settings');
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET /settings/activelist');
  Story.find({}, { storylive: true }, function (e, docs) {
    debug(docs);
    req.app.locals.activelist = []
    docs.forEach( (entry) => {
      if (entry.storylive === true) {
        req.app.locals.activelist.push(entry._id);
      }
    });
    debug(req.app.locals.activelist)
    res.send({
      response: 'response'
    });
  });
};
