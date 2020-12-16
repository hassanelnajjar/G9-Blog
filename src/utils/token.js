const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const jwtSign = (payload, options = {}) => new Promise((resolve, reject) => {
  jwt.sign(payload, SECRET_KEY, options, (err, token) => {
    if (err) return reject(err);
    return resolve(token);
  });
});

const jwtVerify = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) return reject(err);
    return resolve(payload);
  });
});

module.exports = {
  jwtSign, jwtVerify,
};
