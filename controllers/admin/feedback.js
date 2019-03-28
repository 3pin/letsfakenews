'use strict';

const debug = require('debug')('routes_admin');
// import mongoose 'Story' schema
const Feedback = require('../../models/feedback.model');

module.exports = (req, res) => {
  debug('/GET /admin/feedback');
  Feedback.find({}).then((docs) => {
    //res.send({express: "Hello 'REACT /admin/feedback' "});
    res.send({
      feedback: docs
    });
  });
};
