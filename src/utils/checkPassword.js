const bcrypt = require('bcrypt');

const { SECRET_KEY } = process.env;

module.exports.sign = (password) => bcrypt.hash(`${SECRET_KEY}${password}`, 10);
module.exports.validate = (password, hashedPassword) => bcrypt.compare(`${SECRET_KEY}${password}`, hashedPassword);
