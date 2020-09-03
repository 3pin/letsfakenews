'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests');

const { finalConfig } = require('./config');

/** other code to be executed when mocha env setup **/

module.exports = {
  config: finalConfig,
};
