const connection = require('../config/connection');

const addComment = (commentTextContent, usersId, postId) => {
  const sql = {
    text: 'INSERT INTO comments (comment_text_content, users_id,post_id) values($1 ,$2, $3) returning *',
    values: [commentTextContent, usersId, postId],
  };
  return connection.query(sql);
};

module.exports = addComment;
