const { jwtVerify, createCustomError } = require('../utils');

module.exports.checkUser = (req, res, next) => {
  if (!req.cookies.userToken) {
    return next(
      createCustomError({ status: 401, message: 'Un Authorized Access..' }),
    );
  }

  return jwtVerify(req.cookies.userToken).then(({ userID }) => {
    req.handleUserID = userID;
    return next();
  }).catch(() => next(
    createCustomError({ status: 403, message: 'Forbidden Access ...' }),
  ));
};
