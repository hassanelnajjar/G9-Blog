const router = require('express').Router();
const { getPostsbyid, getUserId } = require('../database/queries/getPosts');

router.get('/posts/:postId/:username', (req, res, next) => {
  console.log('hi');
  getUserId(req.params.username)
    .then(() => {
      getPostsbyid(req.params.postId)
        .then((result) => console.log(result.rows))
        .catch();
    })
    .catch();
});

router.post('/posts/:id/comments', (req, res, next) => {
  console.log('ggggg');
  getPostsbyid(req.params.id)
    .then()
    .catch();
});

router.use((err, req, res, next) => {
  res.status(500).json({
    status: err.status || 500,
    msg: err.msg || 'Internal Server Error',
    data: null,
  });
});

module.exports = router;
