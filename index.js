const express = require('express');
const routes = require('./routes');
const app = express();

app.use(routes);

app.listen('8080', () => {
  console.log('Start!');
});
