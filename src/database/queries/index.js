const addComment = require('./addComment');
const getComments = require('./getComments');
const {
  getPosts, getPostsById, getUserId, addUserName,
} = require('./getPosts');
const getCommentsCounts = require('./getCommentsCounts');
const addPost = require('./addPost');
const deletePost = require('./deletePost');

module.exports = {
  addComment,
  getComments,
  getPosts,
  getPostsById,
  getUserId,
  addUserName,
  getCommentsCounts,
  addPost,
  deletePost,
};
