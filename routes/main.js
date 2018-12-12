'use strict';

const debug = require('debug')('index_main')

module.exports = (req, res) => {
  // serve homepage
  debug('/GET msg to index page')
  res.render('users', {
    tabtitle: "LetsFakeNews:Users"
  });
}
