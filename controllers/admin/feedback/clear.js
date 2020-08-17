const debug = require('debug')('controller');
// import mongoose 'Story' schema
// const Base = require('../../../models/base.model');
const Feedback = require('../../../models/feedback.model');

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/feedback/clear');
  /* set the db collection */
  const {
    room,
  } = req.query;
  /* delete all db entries */
  Feedback.deleteMany({ room }).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
      // debug(docs.result.n + " document(s) deleted");
    }
    res.status(200)
      .json({
        feedback: [],
      });
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
