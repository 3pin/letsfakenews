module.exports = {
  whitelist: process.env.WHITELIST,
  cookieoptionHttponly: false,
  cookieoptionSamesite: false,
  cookieparserSecure: false,
  cors: 'all',
  hsts: false,
  https: 'none',
  httpsRedirect: false,
  keepAlive: 30000,
  tokenAgeMins: 10,
};
