'use strict';

const debug = require('debug')('users/main')

module.exports = (req, res) => {
  // serve homepage
  debug('/GET routes/main')
  res.render('main', {
    tabtitle: "LetsFakeNews:Users"
  });
}
