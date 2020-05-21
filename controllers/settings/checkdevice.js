// on the req object check if client.device.type is 'desktop' before giving access to display route
const debug = require('debug')('controller');

module.exports = (req, res) => {
  debug(`Entered middleware to check device type: ${req.device.type}`);
  // debug(req);
  if (req.device.type === 'desktop') {
    debug('SUCCESS');
    res.status(200).json({
      message: 'You are on a desktop device',
    });
    // res.send('Device is a desktop');
    // next()
  } else {
    debug('FAILED');
    res.status(401)
      .json({
        message: 'NOT_DESKTOP',
      });
    // res.send('Display page can only be accessed via desktop-browsers');
  }
};
