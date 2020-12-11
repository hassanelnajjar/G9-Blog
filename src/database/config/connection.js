const { Pool } = require('pg');
require('env2')('./config.env');

const {
  NODE_ENV, DATABASE_URL, DEV_DB_URL, TEST_DB_URL,
} = process.env;
let dbUrl = '';
switch (NODE_ENV) {
  case 'production':
    dbUrl = DATABASE_URL;
    break;
  case 'development':
    dbUrl = DEV_DB_URL;
    break;
  case 'test':
    dbUrl = TEST_DB_URL;
    break;
  default:
    throw new Error('No Database ...');
}

const options = {
  connectionString: dbUrl,
  ssl: NODE_ENV === 'production',
};

module.exports = new Pool(options);
