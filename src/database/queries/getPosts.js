const connection = require('../config/connection');

const getPosts = () => connection.query('SELECT * FROM posts');
const getUserId = (username) => connection.query(`SELECT id FROM users WHERE user_name = ${username}`);
const getPostsbyid = (id) => connection.query(`SELECT * FROM posts WHERE id = ${id}`);
const appPost = () => module.exports = { getPosts, getPostsbyid, getUserId };
