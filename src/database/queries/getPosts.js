const connection = require('../config/connection');

const getPosts = () => connection.query('SELECT posts.id,posts.post_text,users.user_name,posts.posted_at_time FROM posts left join users on posts.users_id = users.id order by posts.posted_at_time desc');
const getUserId = (username) => connection.query('SELECT id FROM users WHERE user_name = $1', [username]);
const getPostsById = (id) => connection.query('SELECT * FROM posts WHERE id = $1', [id]);
const addUserName = (username) => connection.query('insert into users(user_name) values ($1) returning id', [username]);

module.exports = {
  getPosts, getPostsById, getUserId, addUserName,
};

// addUserName('alassaadaldain').then((res) => console.log(res)).catch(console.log);
