module.exports = {
  database: process.env.DATABASE,
  mongodbUri: process.env.MONGODB_URI,
  mongodbUriTests: process.env.MONGODB_URI_TESTS,
  dbMode: 'next',
  entryToRead: 0,
};
