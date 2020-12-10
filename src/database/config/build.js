/* eslint-disable no-console */
const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connection');

const buildDb = (fileName) => {
  const sql = readFileSync(join(__dirname, 'buildDataSql', `${fileName}.sql`)).toString();
  return connection.query(sql);
};

module.exports = buildDb;
