
const debug = require('debug')('routes_admin');
const refreshSaveUrlsIterative = require('../../../modules/refreshSaveUrlsIterative.js');

module.exports = (req, res) => {
  debug('/routes/databases/refresh');
  refreshSaveUrlsIterative.process().then((result) => {
    debug(result);
    // res.redirect('/admin/stories');
  }).then(() => {
    res.send({
      res: 'All documents url-fields have been refreshed',
    });
  }).catch((err) => {
    debug('Err: ', err);
  });
};
