'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Base = require('../../models/base.model');
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear')
  /* set the db collection */
  let query;
  if (req.body.subject == 'Feedback') {
    query = {__type:'Feedback'}
  } else if (req.body.subject == 'Stories') {
    query = {__type:'Story'}
  }
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
  }).then( () => {
    /* empty the active activelist if we are clearing stories */
    Settings.findOneAndUpdate(
      {},
      { activelist: [],
        entry_to_read: 0,
        },
      {new: true})
    .then((res) => {
      debug('response');
      debug(res);
    });
  }).catch((err) => {
    debug("Err: ", err);
  });
}
