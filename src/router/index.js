/* eslint-disable no-useless-catch */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { checkUser } = require('../middlewares');
const { getUserByEmail, addUser, getUserById } = require('../database/queries');

const { SECRET_KEY } = process.env;
// @ts-ignore
const {
  getPostRouter,
  getPostsByIdRouter,
  getCommentsRouter,
  addCommentRouter,
  addPostRouter,
  deletePostRouter,
} = require('../controllers/index');
const { join } = require('path');

router.get('/posts', getPostRouter);
router.get('/posts/:postId', getPostsByIdRouter);
router.get('/comments/:postId', getCommentsRouter);
router.post('/add-comment/:postId/:username', addCommentRouter);
router.post('/add-post', addPostRouter);
router.delete('/delete-ali', deletePostRouter);

router.get('/userName', checkUser, (req, res, next) => {
  console.log(req.userID);
  getUserById(req.userID).then((results) => {
    if (!results.rowCount) {
      const err = new Error('');
      err.status = 404;
      err.msg = 'user not found';
      throw err;
    }
    return res.send({ status: 200, msg: 'success', data: results.rows[0].user_name });
  }).catch(next);
});

router.get('/logout', (req, res) => {
  res.clearCookie('userToken').redirect('/login');
});

router.post('/login', (req, res, next) => {
  const {
    userEmail, userPassword,
  } = req.body;

  const errors = [];
  if (!userEmail || !userPassword) {
    errors.push({
      data: null,
      status: 400,
      msg: 'You need to enter all values',
    });
  }

  if (userPassword < 6) {
    errors.push({
      data: null,
      status: 400,
      msg: 'Your password should be more than 6 chars',
    });
  }

  if (errors.length > 0) {
    return res.json(errors).redirect('/login');
  }
  getUserByEmail(userEmail)
    .then((result) => {
      if (!result.rowCount) {
        const err = new Error();
        err.status = 404;
        err.msg = 'User not found';
        throw err;
      }
      return result;
    }).then((result) => {
      const storedPassword = result.rows[0].user_password;
      const hashedPassword = crypto.createHmac('sha256', SECRET_KEY).update(userPassword).digest('hex');
      if (storedPassword !== hashedPassword) {
        const err = new Error();
        err.status = 401;
        err.msg = 'Password incorrect';
        throw err;
      }
      const payload = { userID: result.rows[0].id };
      const token = jwt.sign(payload, SECRET_KEY);
      res.cookie('userToken', token).redirect('/home');
    }).catch(next);
});

router.post('/register', (req, res, next) => {
  const {
    userName, userEmail, userPassword, userPassword2,
  } = req.body;

  const errors = [];
  if (!userName || !userEmail || !userPassword || !userPassword2) {
    errors.push({
      data: null,
      status: 400,
      msg: 'You need to enter all values',
    });
  }

  if (userPassword !== userPassword2) {
    errors.push({
      data: null,
      status: 400,
      msg: 'Your passwords should be identical',
    });
  }

  if (userPassword < 6) {
    errors.push({
      data: null,
      status: 400,
      msg: 'Your password should be more than 6 chars',
    });
  }

  if (errors.length > 0) {
    return res.redirect('/login');
  }

  const hashedPassword = crypto.createHmac('sha256', SECRET_KEY).update(userPassword).digest('hex');
  getUserByEmail(userEmail)
    .then((userID) => {
      if (!userID.rowCount) {
        return addUser(userName, userEmail, hashedPassword);
      }
      const err = new Error('');
      err.status = 400;
      err.msg = 'Your already registered';
      throw err;
    }).then((userID) => {
      const payload = { userID: userID.rows[0] };
      const token = jwt.sign(payload, SECRET_KEY);
      res.cookie('userToken', token).redirect('/home');
    }).catch(next);
});

router.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);
  res.status(status).json({
    status,
    msg: err.msg || 'Internal Server Error',
    data: null,
  });
});

module.exports = router;
