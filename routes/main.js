'use strict';

const debug = require('debug')('main')

module.exports = (req, res) => {
  // serve homepage
  debug('/GET routes/main')
  res.render('main', {
    tabtitle: "LetsFakeNews:Users"
  });
}
