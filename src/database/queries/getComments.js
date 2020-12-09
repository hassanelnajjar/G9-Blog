const connection = require('../config/connection');

const getComments = (postId) => connection.query('SELECT * FROM comments where post_id= $1', [postId]);

module.exports = getComments;
