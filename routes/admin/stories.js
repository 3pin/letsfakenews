'use strict';

const debug = require('debug')('routes_admin');

module.exports = (req, res) => {
  debug('/GET /admin/stories');
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({stories: docs});
  });
};
