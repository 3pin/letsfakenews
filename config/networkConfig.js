const whitelist = process.env.WHITELIST.split(',');

module.exports = {
  cookieparserSecure: JSON.parse(process.env.SECURE),
  cookieoptionHttponly: false,
  cookieoptionSamesite: process.env.SAMESITE,
  whitelist,
  cors: process.env.CORS,
  hsts: false,
  https: 'none',
  httpsRedirect: false,
  keepAlive: 30000,
  tokenAgeMins: 10,
};
