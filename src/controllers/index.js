/* eslint-disable camelcase */
const {
  validateLogin,
  validateRegister,
  sign,
  validate,
  jwtSign,
  createCustomError,
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
  const { postId } = req.params;
  const { text_content } = req.body;
  const { handleUserID } = req;
  addComment(text_content, handleUserID, +postId)
    .then(({ rows }) => res.status(200).json({
      data: rows,
      msg: 'success',
      status: 200,
    }))
    .catch(next);
};
// add post
module.exports.addPostRouter = (req, res, next) => {
  const { text_content } = req.body;
  const { handleUserID } = req;
  addPost(text_content, handleUserID)
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
  const { handleUserID } = req;
  deletePost(postId, handleUserID)
    .then(() => res.json({
      data: null,
      msg: 'success',
      status: 200,
    }))
    .catch(next);
};
// get user name
module.exports.getUserName = (req, res, next) => {
  const { handleUserID } = req;
  getUserById(handleUserID)
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

// logout function
module.exports.logoutFunction = (req, res) => {
  res
    .clearCookie('userToken')
    .json({ data: null, status: 200, msg: 'logged out successfully' });
};

// login function
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
        throw createCustomError({ status: 400, message: 'User not found' });
      }
      return result;
    })
    .then((result) => {
      const storedPassword = result.rows[0].user_password;
      const userID = result.rows[0].id;
      sign(storedPassword).then((hash) => console.log(hash));
      return Promise.all([
        validate(userPassword, storedPassword),
        Promise.resolve(userID),
      ]);
    })
    .then((results) => {
      if (!results[0]) {
        throw createCustomError({ status: 401, message: 'Password incorrect' });
      }
      return jwtSign({ userID: results[1] }, { expiresIn: '24h' });
    })
    .then((token) => res
      .cookie('userToken', token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      })
      .json({ data: null, msg: 'logged in successfully', status: 200 }))
    .catch(next);
};

// register function
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
      if (userID.rowCount) {
        throw createCustomError({
          status: 400,
          message: 'Your already registered',
        });
      }
      return addUser(userName, userEmail, hashedPassword);
    })
    .then((userID) => jwtSign({ userID: userID.rows[0].id }, { expiresIn: '24h' }))
    .then((token) => res
      .cookie('userToken', token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      })
      .json({ data: null, status: 200, msg: 'success registration' }))
    .catch(next);
};
