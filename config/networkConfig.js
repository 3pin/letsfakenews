const whitelist = process.env.WHITELIST.split(',');

module.exports = {
  whitelist,
  cookieoptionHttponly: false,
  cookieoptionSamesite: false,
  cookieparserSecure: false,
  cors: process.env.CORS,
  hsts: false,
  https: 'none',
  httpsRedirect: false,
  keepAlive: 30000,
  tokenAgeMins: 10,
};
