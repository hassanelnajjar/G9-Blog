const { validateLogin, validateRegister } = require('./validation');
const { sign, validate } = require('./checkPassword');
const { jwtSign, jwtVerify } = require('./token');

module.exports = {
  validateLogin, sign, validate, jwtSign, jwtVerify, validateRegister,
};
