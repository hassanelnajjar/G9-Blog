const connection = require('../config/connection');

const addPost = (postText, userId) => {
  const sql = {
    text: 'INSERT INTO posts (post_text,users_id) values($1 ,$2) returning *',
    values: [postText, userId],
  };
  return connection.query(sql);
};

module.exports = addPost;
