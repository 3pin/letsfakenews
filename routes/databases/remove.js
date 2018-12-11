'use strict';

const debug = require('debug')('databases_remove')

const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});

function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  //return next()
}

module.exports = (req, res) => {
  /* delete a db entry */
  let query = {
    story: req.body.data
  };
  debug(query)
  let collection = req.db.get(process.env.COLLECTION);
  collection.remove(query).then((err, docs) => {
    if (err) {
      debug('error');
      debug(err);
    } else {
      debub('no error');
      //debug(docs.result.n + " document(s) deleted");
      res.send("document(s) deleted");
    }
  });
};
