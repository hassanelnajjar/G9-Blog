const connection = require('../config/connection');

const getPosts = () => connection.query(
  'select postid,post_text,posted_at_time,count,user_name,userId from (SELECT posts.id as postid,posts.post_text,posts.posted_at_time,count(comments.post_id),posts.users_id as userId FROM posts left join comments on posts.id = comments.post_id GROUP by posts.id) as foo inner join users on foo.userId = users.id order by posted_at_time desc',
);
const getUserId = (username) => connection.query('SELECT id FROM users WHERE user_name = $1', [username]);

const getPostsById = (id) => connection.query('select postid,post_text,posted_at_time,count,user_name,userId from (SELECT posts.id as postid,posts.post_text,posts.posted_at_time,count(comments.post_id),posts.users_id as userId FROM posts left join comments on posts.id = comments.post_id GROUP by posts.id) as foo inner join users on foo.userId = users.id where postid=$1', [id]);

const addUserName = (username) => connection.query('insert into users(user_name) values ($1) returning id', [username]);

module.exports = {
  getPosts, getPostsById, getUserId, addUserName,
};
