'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Base = require('../../models/base.model');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear')
  /* set the db collection */
  let query
  if (req.body.subject == 'Feedback') {
    query = {__type:'Feedback'}
  } else if (req.body.subject == 'Stories') {
    query = {__type:'Story'}
    /* empty the active activelist if we are clearing stories */
    req.app.locals.activelist = [];
    req.app.locals.entry_to_read = 0;
  }
  debug(query);
  /* delete a db entry */
  Base.deleteMany(query).then((docs,err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
      //debug(docs.result.n + " document(s) deleted");
    }
    res.json({
      data: []
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
