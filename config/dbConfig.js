const rooms = process.env.ROOMS.split(',');
const usernames = process.env.ROOMS_ADMINS.split(',');
const passwords = process.env.ROOMS_PASSWORDS.split(',');

module.exports = {
  database: process.env.DATABASE,
  mongodbUri: process.env.MONGODB_URI,
  mongodbUriTests: process.env.MONGODB_URI_TESTS,
  dbMode: 'next',
  entryToRead: 0,
  roomSetup: {
    rooms,
    usernames,
    passwords,
  },
};
