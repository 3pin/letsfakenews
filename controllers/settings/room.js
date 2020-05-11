const debug = require('debug')('room');
// import mongoose schemas
// const Settings = require('../models/settings.model');

module.exports = (req, res) => {
  debug('/POST routes_room');
  // Get our form values. These rely on the "name" attributes
  const { room } = req.body;
  debug(room);
  const { rooms } = global.config.roomsSetup;
  debug(rooms);
  for (let i = 0; i < rooms.length; i += 1) {
    if (rooms[i] === room) {
      res.send(true);
      debug('Success');
      break;
    } else if (i === rooms.length - 1) {
      res.send(false);
      debug('Failure');
    }
  }
  /* Save to the DB
  const feedback = new Feedback({ ...result });
  feedback.save()
    .then(() => {
      debug('Document inserted to db_feedback successfully');
      res.send('Feedback inserted into database successfully');
    }).catch((err) => {
      debug('Err: ', err);
    });
    */
};
