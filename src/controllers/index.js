const router = require('express').Router();
const {
  addComment, getUserId, addUserName,
} = require('../database/queries');
// add Comments
router.post('/add-comment/:postId/:username', (req, res, next) => {
  getUserId(req.params.username)
    .then((usernameId) => {
      if (usernameId.rows.length !== 0) {
        // eslint-disable-next-line max-len
        addComment(req.body.text_content, usernameId.rows[0].id, req.params.postId).then(({ rows }) => res.status(200).json({
          data: rows,
          msg: 'success',
          status: 200,
        })).catch(next);
        return;
      }
      // eslint-disable-next-line max-len
      addUserName(req.params.username).then((userNameId) => addComment(req.body.text_content, userNameId.rows[0].id, req.params.postId).then(() => res.status(200).json({
        data: null,
        msg: 'success',
        status: 200,
      })).catch(next));
    })
    .catch(next);
});

router.post('/posts/:id/comments', (req, res, next) => {
  console.log('ggggg');
  getPostsbyid(req.params.id)
    .then()
    .catch();
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: err.status || 500,
    msg: err.msg || 'Internal Server Error',
    data: null,
  });
});

module.exports = router;
