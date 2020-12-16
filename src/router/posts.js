const router = require('express').Router();
const { checkUser } = require('../middleware');
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

router.get('/posts', checkUser, getPostRouter);
router.get('/posts/:postId', checkUser, getPostsByIdRouter);
router.get('/comments/:postId', checkUser, getCommentsRouter);
router.post('/add-comment/:postId', checkUser, addCommentRouter);
router.post('/add-post', checkUser, addPostRouter);
router.delete('/delete-ali', checkUser, deletePostRouter);

router.get('/userName', checkUser, getUserName);
router.get('/logout', checkUser, logoutFunction);
router.post('/login', loginFunction);
router.post('/register', register);

router.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  res.status(status).json({
    status,
    msg: err.msg || 'Internal Server Error',
    data: null,
  });
});

module.exports = router;
