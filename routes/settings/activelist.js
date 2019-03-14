'use strict';

const debug = require('debug')('routes_settings');

module.exports = (req, res) => {
  debug('/GET /settings/activelist');
  let collection = req.db.get(process.env.DB_STORIES);
  collection.find({}, { storylive: true }, function (e, docs) {
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
