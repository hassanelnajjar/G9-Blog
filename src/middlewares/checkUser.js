const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res, next) => {
  try {
    const { SECRET_KEY } = process.env;
    const { userToken } = req.cookies;
    const { userID } = jwt.verify(userToken, SECRET_KEY);
    req.userID = userID;
    next();
  } catch (err) {
    err.status = 401;
    err.msg = 'Not Auth';
    next(err);
  }
};
