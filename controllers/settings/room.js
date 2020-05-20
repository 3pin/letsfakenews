const debug = require('debug')('controller');

module.exports = (req, res) => {
  debug('/GET routes_room');
  // Get our form values. These rely on the "name" attributes
  const { room } = req.query;
  debug(room);
  const { rooms } = global.gConfig.roomSetup;
  debug(rooms);
  for (let i = 0; i < rooms.length; i += 1) {
    if (rooms[i] === room) {
      res.send('Your chosen room is valid');
      break;
    } else if (i === rooms.length - 1) {
      res.status(401).json({
        message: 'INCORRECT_ROOM',
      });
    }
  }
};
