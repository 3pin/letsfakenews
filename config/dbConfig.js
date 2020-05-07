module.exports = {
  database: process.env.DATABASE,
  mongodbUri: process.env.MONGODB_URI,
  mongodbUriTests: process.env.MONGODB_URI_TESTS,
  dbMode: 'next',
  entryToRead: 0,
  roomsSetup: {
    rooms: process.env.ROOMS.split(','),
    admins: process.env.ROOMS_ADMINS.split(','),
    passwords: process.env.ROOMS_PASSWORDS.split(','),
  },
};
