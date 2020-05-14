
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
  // const query = { room: room };
  Feedback.deleteMany(room).then((docs, err) => {
    if (err) {
      debug(err);
    } else {
      debug(docs);
      // debug(docs.result.n + " document(s) deleted");
    }
    res.send({
      feedback: [],
    });
  }).catch((err) => {
    debug('Err: ', err);
  });
};
