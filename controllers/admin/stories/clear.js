'use strict'

const debug = require('debug')('routes_admin')
// import mongoose 'Story' schema
const Base = require('../../../models/base.model')
// tap into an sse event-bus
const bus = require('../../../modules/eventbus')
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate')

module.exports = (req, res) => {
  debug('/DELETE /routes/admin/clear')
  /* set the db collection */
  const dbSettings = req.dbSettings
  const query = { __type: 'Story' }
  /* delete all db entries */
  Base.deleteMany(query).then((docs, err) => {
    if (err) {
      debug(err)
    } else {
      debug(docs)
      // debug(docs.result.n + " document(s) deleted");
    }
    res.json({
      stories: [],
      activelistChange: 0,
      visualise: 0
    })
  }).then(() => {
    /* empty the active activelist */
    dbSettings.activelist = []
    dbSettings.entryToRead = 0
    dbSettingsUpdate(dbSettings)
    /* tell visualise-pages about activeListChange */
    bus.emit('activelistChange', 0)
  }).catch((err) => {
    debug('Err: ', err)
  })
}
