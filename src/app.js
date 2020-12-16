/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
require('env2')('./config.env');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const { join } = require('path');
const cookieParser = require('cookie-parser');
// routers
const postsRouter = require('./router/posts');
const homeRouter = require('./router/home');

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.disable('view cache');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public'), { 'Cache-Control': false }));

app.set('port', process.env.PORT || 4500);

app.use('/', homeRouter);
app.use('/api/v1/', postsRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(join(__dirname, '..', 'public', '404.html'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).sendFile(join(__dirname, '..', 'public', '500.html'));
});
module.exports = app;
