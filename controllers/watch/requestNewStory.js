// public routes into the app

'use strict'
const debug = require('debug')('routes_watch')
// import mongoose schemas
const Story = require('../../models/story.model')
// import middelware module to update dbSettings (entryToRead etc)
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate')
const dbFetchMode = require('../../modules/dbFetchMode.js')
// module variables
let id, obj

module.exports = (req, res) => {
  // detect client device type
  debug(req.device.type)
  if (req.device.type === 'desktop') {
    debug('/GET routes/displays/request_new_story')
    // choose an id from activelist[]...
    if (req.dbSettings.dbMode === 'next') {
      obj = dbFetchMode.nextEntry(req.dbSettings.activelist, req.dbSettings.entryToRead)
    } else {
      obj = dbFetchMode.randomEntry(req.dbSettings.activelist)
    }
    id = obj.id
    debug('id to read from activelist: ' + id)
    // fetch the JSON from db
    Story.findById(id, (err, data) => {
      debug(data)
      res.send({
        data: data
      })
      debug(err)
    }).then(() => {
      // save settings to req.dbSettings for for next time-around
      req.dbSettings.entryToRead = obj.entryToRead
      req.dbSettings.dbMode = obj.dbMode
      dbSettingsUpdate(req.dbSettings).then((docs) => {
        debug('Settings for next time around: ', docs)
      })
    }).catch((err) => {
      debug('Err: ', err)
    })
  } else {
    debug('Mobile device attempted to access /routes/watch')
  }
}
