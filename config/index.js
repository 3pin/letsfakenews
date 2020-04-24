const _ = require('lodash');

// const dotenv = require('dotenv');

// dotenv.config();
// load the ENVIRONMENT variables
require('dotenv').config();

const dbConfig = require('./dbConfig');
const networkConfig = require('./networkConfig');
const secretConfig = require('./secretConfig');
const setupConfig = require('./setupConfig');

const finalConfig = _.merge(dbConfig, networkConfig, secretConfig, setupConfig);

global.config = finalConfig;
