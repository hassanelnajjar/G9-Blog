const connection = require('../config/connection');

const getPosts = () => connection.query('SELECT * FROM posts');
const getUserId = (username) => connection.query('SELECT id FROM users WHERE user_name = $1', [username]);
const getPostsById = (id) => connection.query(`SELECT * FROM posts WHERE id = ${id}`);
const addUserName = (username) => connection.query('insert into users(user_name) values ($1) returning id', [username]);

module.exports = {
  getPosts, getPostsById, getUserId, addUserName,
};

// addUserName('alassaadaldain').then((res) => console.log(res)).catch(console.log);
