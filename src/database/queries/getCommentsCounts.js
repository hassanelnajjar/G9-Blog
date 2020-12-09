const connection = require('../config/connection');

const getCommentsCounts = (postId) => connection.query('SELECT count(id) FROM comments where post_id= $1 group by id', [postId]);

module.exports = getCommentsCounts;
