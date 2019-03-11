'use strict';

const debug = require('debug')('routes_admin')

module.exports = (req, res) => {
  /* set the db collection */
  if (req.body.database == 'DB_FEEDBACK') {
    var collection = req.db.get(process.env.DB_FEEDBACK);
  } else if (req.body.database == 'DB_STORIES') {
    var collection = req.db.get(process.env.DB_STORIES);
    /* empty the active activelist if we are clearing stories */
    req.app.locals.activelist = [];
    req.app.locals.entry_to_read = 0;
  }
  /* delete a db entry */
  let query = {
    _id: req.body.data
  };
  collection.drop().then((err, docs) => {
    if (err) {
      //debug('error');
      //debug(err);
    } else {
      debug('no error');
      //debug(docs.result.n + " document(s) deleted");
    }
    res.json({
      data: []
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
