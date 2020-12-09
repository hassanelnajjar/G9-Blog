const router = require('express').Router();
const {
  addComment, getUserId, addUserName, addPost, getPosts, getComments, getPostsById,
} = require('../database/queries');

// get all posts
router.get('/posts', (req, res, next) => {
  getPosts().then((results) => res.json({
    data: results.rows,
    status: 200,
    msg: 'success',
  })).catch(next);
});

router.get('/posts/:postId', (req, res, next) => {
  getPostsById(+req.params.postId).then((results) => {
    res.json({
      data: results.rows,
      status: 200,
      msg: 'success',
    });
  }).catch(next);
});

// get Comments for specific post
router.get('/comments/:postId', (req, res, next) => {
  getComments(req.params.postId)
    .then((results) => res.json({
      data: results.rows,
      status: 200,
      msg: 'success',
    })).catch(next);
});

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

// add post
router.post('/add-post', (req, res, next) => {
  console.log(req.body);
  getUserId(req.body.username)
    .then((usernameId) => {
      if (usernameId.rows.length !== 0) {
        // eslint-disable-next-line max-len
        addPost(req.body.text_content, usernameId.rows[0].id)
          .then(({ rows }) => res.status(200).json({
            data: rows,
            msg: 'success',
            status: 200,
          })).catch(next);
        return;
      }
      // eslint-disable-next-line max-len
      addUserName(req.body.username).then((newUserNameId) => {
        addPost(req.body.text_content, newUserNameId.rows[0].id)
          .then(() => res.status(200).json({
            data: null,
            msg: 'success',
            status: 200,
          })).catch(next);
      }).catch(next);
    }).catch(next);
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
