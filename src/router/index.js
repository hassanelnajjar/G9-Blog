const router = require('express').Router();
// @ts-ignore
const {
  getPostRouter,
  getPostsByIdRouter,
  getCommentsRouter,
  addCommentRouter,
  addPostRouter,
  deletePostRouter,
} = require('../controllers/index');

router.get('/posts', getPostRouter);
router.get('/posts/:postId', getPostsByIdRouter);
router.get('/comments/:postId', getCommentsRouter);
router.post('/add-comment/:postId/:username', addCommentRouter);
router.post('/add-post', addPostRouter);
router.delete('/delete', deletePostRouter);

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
