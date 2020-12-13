const connection = require('../config/connection');

const addUser = (userName, userEmail, userPassword) => connection.query('INSERT into users(user_name,user_email,user_password) values ($1,$2,$3) returning id;', [userName, userEmail, userPassword]);

module.exports = addUser;
