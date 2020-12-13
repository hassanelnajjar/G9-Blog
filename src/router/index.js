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
  getUserName,
  logoutFunction,
  loginFunction,
  register,
} = require('../controllers/index');

router.get('/posts', getPostRouter);
router.get('/posts/:postId', getPostsByIdRouter);
router.get('/comments/:postId', getCommentsRouter);
router.post('/add-comment/:postId/:username', addCommentRouter);
router.post('/add-post', addPostRouter);
router.delete('/delete-ali', deletePostRouter);

router.get('/userName', checkUser, getUserName);
router.get('/logout', checkUser, logoutFunction);
router.post('/login', loginFunction);
router.post('/register', register);

router.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    msg: err.msg || 'Internal Server Error',
    data: null,
  });
});

module.exports = router;
