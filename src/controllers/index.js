/* eslint-disable camelcase */
const {
  validateLogin,
  validateRegister,
  sign,
  validate,
  jwtSign,
} = require('../utils');

const {
  addComment,
  getUserId,
  addUserName,
  addPost,
  getPosts,
  getComments,
  getPostsById,
  deletePost,
  getUserByEmail,
  getUserById,
  addUser,
} = require('../database/queries');
// get all posts
module.exports.getPostRouter = (req, res, next) => {
  getPosts()
    .then((results) => res.json({
      data: results.rows,
      status: 200,
      msg: 'success',
    }))
    .catch(next);
};
// get post by post id
module.exports.getPostsByIdRouter = (req, res, next) => {
  getPostsById(+req.params.postId)
    .then((results) => {
      res.json({
        data: results.rows,
        status: 200,
        msg: 'success',
      });
    })
    .catch(next);
};
// get Comments for specific post
module.exports.getCommentsRouter = (req, res, next) => {
  getComments(req.params.postId)
    .then((results) => res.json({
      data: results.rows,
      status: 200,
      msg: 'success',
    }))
    .catch(next);
};
// add Comments
module.exports.addCommentRouter = (req, res, next) => {
  const { username, postId } = req.params;
  const { text_content } = req.body;
  getUserId(username)
    .then((usernameId) => {
      if (!usernameId.rowCount) {
        return addUserName(username);
      }
      return usernameId;
    })
    .then(({ rows }) => addComment(text_content, rows[0].id, +postId))
    .then(({ rows }) => res.status(200).json({
      data: rows,
      msg: 'success',
      status: 200,
    }))
    .catch(next);
};
// add post
module.exports.addPostRouter = (req, res, next) => {
  const { username, text_content } = req.body;
  getUserId(username)
    .then((usernameId) => {
      if (!usernameId.rowCount) {
        return addUserName(username);
      }
      return usernameId;
    })
    .then(({ rows }) => addPost(text_content, rows[0].id))
    .then(({ rows }) => {
      res.status(200).json({
        data: rows,
        msg: 'success',
        status: 200,
      });
    })
    .catch(next);
};
// delete post
module.exports.deletePostRouter = (req, res, next) => {
  const { postId } = req.body;
  deletePost(postId)
    .then(() => res.json({
      data: null,
      msg: 'success',
      status: 200,
    }))
    .catch(next);
};

module.exports.getUserName = (req, res, next) => {
  const { userID } = req.body;
  getUserById(userID)
    .then((results) => {
      if (!results.rowCount) {
        const err = new Error('');
        err.status = 404;
        err.msg = 'user not found';
        throw err;
      }
      return res.send({
        status: 200,
        msg: 'success',
        data: results.rows[0].user_name,
      });
    })
    .catch(next);
};

module.exports.logoutFunction = (req, res) => {
  res.clearCookie('userToken').redirect('/login');
};
module.exports.loginFunction = (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  const errors = validateLogin(userEmail, userPassword);

  if (errors) {
    const details = errors.details.map((el) => el.message);
    return res.status(400).json({ data: details, msg: 'fails', status: 400 });
  }
  return getUserByEmail(userEmail)
    .then((result) => {
      if (!result.rowCount) {
        const err = new Error();
        err.status = 404;
        err.msg = 'User not found';
        throw err;
      }
      return result;
    })
    .then((result) => {
      const storedPassword = result.rows[0].user_password;
      const userID = result.rows[0].id;
      return Promise.all([
        validate(userPassword, storedPassword),
        Promise.resolve(userID),
      ]);
    })
    .then((results) => {
      if (!results[0]) {
        const err = new Error();
        err.status = 401;
        err.msg = 'Password incorrect';
        throw err;
      }
      const token = jwtSign({ userID: results[1] });
      res.cookie('userToken', token).redirect('/home');
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const {
    userName, userEmail, userPassword, userPassword2,
  } = req.body;

  const errors = validateRegister(
    userName,
    userEmail,
    userPassword,
    userPassword2,
  );

  if (errors) {
    const details = errors.details.map((el) => el.message);
    return res.status(400).json({ data: details, msg: 'fails', status: 400 });
  }

  return Promise.all([sign(userPassword), getUserByEmail(userEmail)])
    .then((results) => {
      const hashedPassword = results[0];
      const userID = results[1];
      if (!userID.rowCount) {
        return addUser(userName, userEmail, hashedPassword);
      }
      const err = new Error('');
      err.status = 400;
      err.msg = 'Your already registered';
      throw err;
    })
    .then((userID) => jwtSign({ userID: userID.rows[0].id }))
    .then((token) => res.cookie('userToken', token).redirect('/home'))
    .catch(next);
};
