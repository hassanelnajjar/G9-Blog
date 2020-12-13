const connection = require('../config/connection');

const getUserById = (userId) => connection.query('SELECT user_name FROM users where id=$1', [userId]);

module.exports = getUserById;
