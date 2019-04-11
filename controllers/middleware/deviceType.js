// on the req object check if client.device.type is 'desktop' before giving access to display route
const debug = require('debug')('middleware');

module.exports = (req, res, next) => {
  debug("Entered middleware to check device type");
  if (req.device.type === 'desktop') {
    debug("Device is desktop");
    next()
  } else {
    debug("Device is NOT desktop");
    res.status(401).send('The display page can only be accessed on desktop browsers');
  }
}
