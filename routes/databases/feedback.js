'use strict';

const debug = require('debug')('databases_feedback')

module.exports = (req, res) => {
  debug(process.env.FEEDBACK)
  let collection = req.db.get(process.env.FEEDBACK);
  collection.find({}, {}, function(e, docs) {
    res.render('databases/feedback', {
      tabtitle: "LetsFakeNews:db_feedback",
      feedback: docs
    });
  });
};
