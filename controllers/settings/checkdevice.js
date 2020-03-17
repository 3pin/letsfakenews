// on the req object check if client.device.type is 'desktop' before giving access to display route
const debug = require('debug')('checkDevice')

module.exports = (req, res) => {
  debug('Entered middleware to check device type: ' + req.device.type)
  if (req.device.type === 'desktop') {
    debug('Device is a desktop')
    res.status(200).send('Device is a desktop')
    // next()
  } else {
    debug('Device is NOT a desktop')
    res.status(401).send('Display page can only be accessed via desktop-browsers')
  }
}
