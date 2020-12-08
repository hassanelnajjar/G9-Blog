const express = require('express');
const compression = require('compression');
const { join } = require('path');
const router = require('./controllers');

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public'), { maxAge: '30d' }));

app.set('port', process.env.PORT || 5000);

app.use('/api/v1/', router);

app.use((req, res, next) => {
  res.status(404).send(join(__dirname, '..', 'public', '404.html'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(join(__dirname, '..', 'public', '500.html'));
});
module.exports = app;
