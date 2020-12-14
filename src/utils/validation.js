const Joi = require('joi');

module.exports.validateRegister = (userName, userEmail, userPassword, userPassword2) => {
  const schema = Joi.object().keys({
    userName: Joi.string().min(3).max(50).required(),
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    userPassword2: Joi.ref('userPassword'),
  });

  const { error } = schema.validate({
    userName, userEmail, userPassword, userPassword2,
  });

  return error;
};

module.exports.validateLogin = (userEmail, userPassword) => {
  const schema = Joi.object().keys({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

  const { error } = schema.validate({
    userEmail, userPassword,
  });

  return error;
};
