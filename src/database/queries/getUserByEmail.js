const connection = require('../config/connection');

const getUserByEmail = (email) => connection.query('SELECT id,user_password FROM users where user_email= $1', [email]);

module.exports = getUserByEmail;
