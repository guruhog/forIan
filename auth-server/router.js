const { Router } = require('express');
const Joi = require('joi');
const {
  tokenSecret,
  refreshTokenSecret,
  entityID,
  assertEndpoint,
  ssoUrl,
  redirectSuccessUrl,
  redirectErrorUrl
} = require('./config');
const jwt = require('jsonwebtoken');
const Ldap = require('./libraries/ldapClient');
const fs = require('fs');
const path = require('path');

/** SSO */
const saml2 = require('saml2-js');

const spOptions = {
  entity_id: entityID,
  certificate: fs.readFileSync('./ssl/sso_cert.pem').toString(),
  assert_endpoint: assertEndpoint
};

const idpOptions = {
  sso_login_url: ssoUrl,
  sso_logout_url: ssoUrl,
  certificates: [fs.readFileSync('./ssl/sso_cert.pem').toString()],
  allow_unencrypted_assertion: true
};

const sp = new saml2.ServiceProvider(spOptions);
const idp = new saml2.IdentityProvider(idpOptions);

module.exports = ({ User }) => {
  const router = Router();

  /** SSO ***************************************************/
  router.get('/ssoLogin', async (_, res) => {
    if (process.env.NODE_ENV === 'development') {
      const user = await User.findOne({ where: { username: 'mihai' } });
      const token = await createSsoToken(user);

      res.redirect(`${redirectSuccessUrl}?incomingToken=${token}`);
    } else {
      sp.create_login_request_url(idp, {}, async (err, login_url) => {
        if (err) {
          return res.redirect(redirectErrorUrl);
        }

        res.redirect(login_url);
      });
    }
  });

  router.get('/ssoLoginError', (_, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
  });

  router.post('/sso', (req, res) => {
    const options = { request_body: req.body, ignore_signature: false };

    sp.post_assert(idp, options, async (err, samlRsp) => {
      if (err) {
        return res.redirect(redirectErrorUrl);
      }

      let user = await User.findOne({
        where: { username: samlRsp.user.name_id.toLowerCase() }
      });

      // if (!user) {
      //   const {
      //     user: { name_id, attributes }
      //   } = samlRsp;

      //   // console.log("fuck no user", attributes);

      //   // user = await User.create({
      //   //   username: name_id,
      //   //   firstname: attributes['first name'],
      //   //   lastname: attributes['last name'],
      //   //   email: attributes['email'],
      //   //   country: attributes['country']
      //   // });
      // }

      const token = await createSsoToken(user);
      res.redirect(`${redirectSuccessUrl}?incomingToken=${token}`);
    });
  });

  const createSsoToken = async user => {
    return jwt.sign(
      { _id: user._id, username: user.username, fullname: user.fullname },
      tokenSecret,
      {
        expiresIn: '365d'
      }
    );
  };
  /** End SSO ************************************************/

  router.post('/login', async (req, res) => {
    const { error } = Joi.validate(req.body, {
      username: Joi.string()
        .required()
        .label('Username'),
      password: Joi.string()
        .required()
        .label('Password')
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;
    const errorMessage = 'Invalid Username or Password';

    if (process.env.NODE_ENV === 'development') {
      const user = await User.findOne({ where: { username } });
      if (!user || password !== '12345') {
        return res.status(400).json({ error: errorMessage });
      }

      const [token, refreshToken] = await createTokens(user);
      res.json({ token, refreshToken });
    } else {
      console.log('request does get through');

      try {
        const ldapClient = new Ldap(username, password);

        await ldapClient
          .authenticate()
          .then(() => ldapClient.search())
          .then(async data => {
            ldapClient.closeConnection();

            console.log('req in ldap');

            const user = await User.findOne({ where: { username } });

            console.log('after db');

            let tokenData = user;
            if (!user) {
              const newUser = await User.create({ ...data });
              tokenData = newUser;
            }

            const [token, refreshToken] = await createTokens(tokenData);
            res.json({ token, refreshToken });
          })
          .catch(() => {
            return res.status(400).json({ error: errorMessage });
          });
      } catch (err) {
        return res.status(400).json({ error: 'System Error! Please try again later' });
      }
    }
  });

  router.post('/refreshToken', async (req, res) => {
    let user_id = -1;
    const oldToken = req.body.refresh_token;

    if (!oldToken) {
      return res.send(false);
    }

    try {
      const { _id } = jwt.decode(oldToken);
      user_id = _id;
    } catch (e) {
      return res.send(false);
    }

    const user = await User.findByPk(user_id);
    if (!user) return res.send(false);

    const [token, refreshToken] = await createTokens(user);

    res.json({ token, refreshToken });
  });

  const createTokens = async user => {
    const token = jwt.sign(
      { _id: user._id, username: user.username, fullname: user.fullname },
      tokenSecret,
      {
        expiresIn: '10h'
      }
    );

    const refreshToken = jwt.sign({ _id: user._id }, refreshTokenSecret + user.password, {
      expiresIn: '14d'
    });

    return Promise.all([token, refreshToken]);
  };

  return router;
};
