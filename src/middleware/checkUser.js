const { jwtVerify } = require('../utils');

module.exports.checkUser = (req, res, next) => {
  try {
    const { userToken } = req.cookies;
    const { userID } = jwtVerify(userToken);
    req.body.userID = userID;
    next();
  } catch (err) {
    err.status = 401;
    err.msg = 'Not Auth';
    next(err);
  }
};
