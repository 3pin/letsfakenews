'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear')
  /* set the db collection */
  let query
  if (req.body.subject == 'Feedback') {
    query = {type:'feedback'}
  } else if (req.body.subject == 'Stories') {
    query = {type:'story'}
    /* empty the active activelist if we are clearing stories */
    req.app.locals.activelist = [];
    req.app.locals.entry_to_read = 0;
  }
  debug(query);
  /* delete a db entry */
  Story.deleteMany(query).then((docs,err) => {
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
