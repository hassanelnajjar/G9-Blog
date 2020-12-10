const connection = require('../config/connection');

const deletePost = (postId) => {
  const sql = {
    text: 'DELETE FROM posts where id = $1',
    values: [postId],
  };
  return connection.query(sql);
};

module.exports = deletePost;
