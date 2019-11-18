const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config');

const verifyToken = token => {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (e) {
    return false;
  }
};

module.exports.verifyToken = verifyToken;
