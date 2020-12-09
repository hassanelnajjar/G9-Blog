const { Pool } = require('pg');
require('env2')('./config.env');

let db_url = '';
switch (process.env.NODE_ENV) {
  case 'production':
    db_url = process.env.DATABASE_URL;
    break;

  case 'development':
    db_url = process.env.DEV_DB_URL;
    break;

  case 'test':
    db_url = process.env.TEST_DB_URL;
    break;

  default:
    throw new Error(' No database url ');
}

db_url = process.env.DEV_DB_URL;

const options = {
  connectionString: db_url,
  ssl: process.env.NODE_ENV === 'production',
};

module.exports = new Pool(options);
