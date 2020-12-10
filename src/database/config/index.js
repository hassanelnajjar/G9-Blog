/* eslint-disable no-console */
const buildDb = require('./build');

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
  .catch(() => console.log('dataBase Failed ...'));
