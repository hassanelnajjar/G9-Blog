/* eslint-disable no-console */
const buildDb = require('./build');
require('env2')('./config.env');

let dataBaseFilePath = '';
const { NODE_ENV } = process.env;
switch (NODE_ENV) {
  case 'development':
    dataBaseFilePath = 'developmentData';
    break;
  case 'production':
    dataBaseFilePath = 'productionData';
    break;
  case 'test':
    dataBaseFilePath = 'testData';
    break;
  default:
    throw new Error('Please Define NODE_ENV');
}

buildDb('schema')
  .then(() => buildDb(dataBaseFilePath))
  .then(() => console.log('dataBase Created ...'))
  .catch((err) => console.log('dataBase Failed ...', err));
