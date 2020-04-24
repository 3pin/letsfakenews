module.exports = {
  database: 'database',
  mongodb_uri: process.env.MONGODB_URI,
  mongodb_uri_remote: process.env.MONGODB_URI_REMOTE,
  mongodb_uri_tests: process.env.MONGODB_URI_TESTS,
  mongolab_bronze_uri: process.env.MONGOLAB_BRONZE_URI,
  db_mode: 'next',
  entry_to_read: 0,
};
