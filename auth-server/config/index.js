module.exports = Object.freeze({
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  tokenSecret: process.env.TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  microServiceName: 'Auth Server',

  /** SSO Stuff */
  doLoginURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/auth/ssoLogin'
      : 'https://auth-server-ag.statwb.eu.novartis.net/auth/ssoLogin',

  redirectSuccessUrl:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.HOME_URL,

  redirectErrorUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/auth/ssoLoginError'
      : 'https://auth-server-ag.statwb.eu.novartis.net/auth/ssoLoginError',

  assertEndpoint: 'https://auth-server-ag.statwb.eu.novartis.net/auth/sso',
  entityID: process.env.ENTITY_ID,
  ssoUrl: 'https://ssoaams-dev.eu.novartis.net:7004/oamfed/idp/samlv20'
});
