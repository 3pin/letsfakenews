
const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Base = require('../../../models/base.model');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/feedback/clear');
  /* set the db collection */
  const query = { __type: 'Feedback' };
  /* delete all db entries */
  Base.deleteMany(query).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
      // debug(docs.result.n + " document(s) deleted");
    }
    res.json({
      feedback: [],
    });
  }).catch((err) => {
    debug('Err: ', err);
  });
};
