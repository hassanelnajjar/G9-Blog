const { writeFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connection');

connection.query('SELECT * from users;').then(({ rows }) => {
  writeFileSync(join(__dirname, 'users.txt'), JSON.stringify(rows), (err) => {
    if (err) return console.log('err', err);
  });
});
