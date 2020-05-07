// const _ = require('lodash');

// load the ENVIRONMENT variables
require('dotenv').config();

/* module debugging */
const debug = require('debug')('config');

const dbConfig = require('./dbConfig');
const networkConfig = require('./networkConfig');
const secretConfig = require('./secretConfig');
const setupConfig = require('./setupConfig');

// const finalConfig = _.merge(dbConfig, networkConfig, secretConfig, setupConfig);
const finalConfig = {
  ...dbConfig,
  ...networkConfig,
  ...secretConfig,
  ...setupConfig,
};

// debug(finalConfig);

global.config = finalConfig;
