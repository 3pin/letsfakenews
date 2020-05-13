const debug = require('debug')('room');

module.exports = (req, res) => {
  debug('/POST routes_room');
  // Get our form values. These rely on the "name" attributes
  const { room } = req.body;
  debug(room);
  const { rooms } = global.config.roomSetup;
  debug(rooms);
  for (let i = 0; i < rooms.length; i += 1) {
    if (rooms[i] === room) {
      res.send(true);
      debug(true);
      break;
    } else if (i === rooms.length - 1) {
      res.send(false);
      debug(false);
    }
  }
};
