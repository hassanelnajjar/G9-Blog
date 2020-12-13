const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
const jwtSign = (payload) => jwt.sign(payload, SECRET_KEY); // return token
const jwtVerify = (userToken) => jwt.verify(userToken, SECRET_KEY); // return payload

module.exports = {
  jwtSign, jwtVerify,
};
