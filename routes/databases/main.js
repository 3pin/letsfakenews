'use strict';

const debug = require('debug')('databases_fetch')

module.exports = (req, res) => {
  debug(process.env.COLLECTION)
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    res.render('databases/main', {
      tabtitle: "LetsFakeNews:db_main",
      stories: docs
    });
  });
};
