const connection = require('../config/connection');

const getComments = (postId) => connection.query('Select comments.comment_text_content,comments.commented_at_time,users.user_name from comments inner join users on users.id = comments.users_id where post_id=$1', [postId]);

module.exports = getComments;
