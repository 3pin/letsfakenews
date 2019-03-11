'use strict';

const debug = require('debug')('routes_admin');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  debug(req.app.locals.autolive);
  let collection = req.db.get(process.env.DB_STORIES);
  collection.find({}, {}, function (e, docs) {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      autolive: req.app.locals.autolive,
      stories: docs
    });
  });
};
