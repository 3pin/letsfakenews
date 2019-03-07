'use strict';
const debug = require('debug')('routes_admin')

module.exports = (req, res) => {
  debug('/GET routes/databases/main')
  //load stories (in order of _id) from db
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {
    sort: {
      _id: 1
    }
  }, (err, docs) => {
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
