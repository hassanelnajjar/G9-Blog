/* eslint-disable camelcase */
const {
  addComment,
  getUserId,
  addUserName,
  addPost,
  getPosts,
  getComments,
  getPostsById,
  deletePost,
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
  console.log(req.body);
  const { text_content } = req.body;
  getUserId(username)
    .then((usernameId) => {
      if (!usernameId.rowCount) {
        return addUserName(username);
      }
      return usernameId;
    })
    .then(({ rows }) => addComment(
      text_content,
      rows[0].id,
      +postId,
    ))
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
  getUserId(req.body.username)
    .then((usernameId) => {
      if (!usernameId.rowCount) {
        return addUserName(username);
      }
      return usernameId;
    })
    .then(({ rows }) => addPost(text_content, rows[0].id))
    .then(({ rows }) => res.status(200).json({
      data: rows,
      msg: 'success',
      status: 200,
    }))
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
