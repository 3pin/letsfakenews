module.exports = {
  database: process.env.DATABASE,
  mongodbUri: process.env.MONGODB_URI,
  mongodbUriRemote: process.env.MONGODB_URI_REMOTE,
  mongodbUriTests: process.env.MONGODB_URI_TESTS,
  mongolabBronzeUri: process.env.MONGOLAB_BRONZE_URI,
  dbMode: 'next',
  entryToRead: 0,
};
