const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connection');

const bulidDb = () => {
  const sql = readFileSync(join(__dirname, 'build.sql')).toString();
  return connection.query(sql);
};

bulidDb()
  .then(() => console.log('success'))
  .catch((err) => console.log(err));
module.exports = bulidDb;
