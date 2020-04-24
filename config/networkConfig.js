module.exports = {
  whitelist: process.env.WHITELIST,
  cookieoption_httponly: false,
  cookieoption_samesite: false,
  cookieparser_secure: false,
  cors: 'off',
  hsts: false,
  https: 'none',
  https_redirect: false,
  keepalive: 30000,
  token_age_mins: 120,
};
