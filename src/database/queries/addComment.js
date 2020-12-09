const connection = require('../config/connection');

const addComment = (comment_text_content, users_id, post_id) => {
  const sql = {
    text: 'INSERT INTO comments (comment_text_content, users_id,post_id) values($1 ,$2, $3)',
    values: [comment_text_content, users_id, post_id],
  };
  return connection.query(sql);
};

module.exports = addComment;
