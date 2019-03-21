'use strict';
const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Story = require('../../models/story.model');

module.exports = (req, res) => {
  debug('/GET routes/databases/main')
  //load stories (in order of _id) from db
  Story.find({}).then((err, docs) => {
    let db_ids = [];
    req.app.locals.activelist = [];
    let object
    for (object in docs) {
      // push all ids into this[] to know the length of full database
      db_ids.push(docs[object]._id);
      // load checked-stories into the activelist[] for reference by display-frontend
      if (docs[object].storylive == true) {
        req.app.locals.activelist.push(docs[object]._id);
      }
    }
    debug('[db_ids] total_length: ' + db_ids.length);
    debug('[activelist] total_length: ' + req.app.locals.activelist.length);
    //render the database admin frtonend
    res.render('databases/main', {
      tabtitle: "LetsFakeNews:db_main",
      stories: docs
    });
  });

};
