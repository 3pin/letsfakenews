'use strict';

const debug = require('debug')('routes_admin');

module.exports = (req, res) => {
  debug('/GET /admin/feedback');
  let collection = req.db.get(process.env.DB_FEEDBACK);
  collection.find({}, {}, function(e, docs) {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({feedback: docs});
  });
};
