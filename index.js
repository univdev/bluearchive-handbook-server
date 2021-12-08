const express = require('express');
const connectTimeout = require('connect-timeout');
const routes = require('./routes');
const commands = require('./commands');
const Nlp = require('./helpers/Nlp');
const app = express();

app.use(connectTimeout('10s'));
app.use(routes);

const learnCommands = async () => {
  const questions = await commands();
  Nlp.learnAllData(questions);
  await Nlp.train();
}

app.listen('8080', async () => {
  console.log('키워드 학습중');
  await learnCommands();
  console.log('Start!');
});
