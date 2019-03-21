'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear')
  /* set the db collection */
  if (req.body.database == 'DB_FEEDBACK') {
    var collection = req.db.get(process.env.DB_FEEDBACK);
  } else if (req.body.database == 'DB_STORIES') {
    var collection = Story;
    /* empty the active activelist if we are clearing stories */
    req.app.locals.activelist = [];
    req.app.locals.entry_to_read = 0;
  }
  /* delete a db entry */
  Story.deleteMany({}).then((docs,err) => {
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
