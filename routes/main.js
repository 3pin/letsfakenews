'use strict';

const debug = require('debug')('main')

module.exports = (req, res) => {
  // serve homepage
  debug('/GET msg to index page')
  res.render('main', {
    tabtitle: "LetsFakeNews:Users"
  });
}
