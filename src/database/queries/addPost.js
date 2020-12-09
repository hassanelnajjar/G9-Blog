const connection = require('../config/connection');

const addPost = () => {
  const sql = {
    text: 'INSERT INTO posts () values($1 ,$2, $3) returning *',
    values: [],
  };
  return connection.query(sql);
};

module.exports = addPost;
