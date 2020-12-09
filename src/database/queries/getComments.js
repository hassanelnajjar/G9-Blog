const connection = require('../config/connection');

const getComments = () => connection.query('SELECT * FROM comments');

module.exports = getComments;
