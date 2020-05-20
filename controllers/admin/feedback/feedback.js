
const debug = require('debug')('controller');
// import mongoose 'Story' schema
const Feedback = require('../../../models/feedback.model');

module.exports = (req, res) => {
  debug('/GET /admin/feedback');
  const {
    room,
  } = req.query;
  debug(room);
  Feedback.find({ room }).sort([['_id', 1]]).then((docs) => {
    debug(docs);
    res.send({
      feedback: docs,
    });
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
