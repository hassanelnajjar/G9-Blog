const app = require('./app');

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running successfully @ http://localhost:${app.get('port')}`);
});
