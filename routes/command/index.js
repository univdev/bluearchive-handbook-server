const express = require('express');
const Nlp = require('../../helpers/Nlp');
const ErrorManager = require('../../helpers/ErrorManager');
const Router = express.Router();

Router.get('/command', async (req, res) => {
  try {
    const { script } = req.query;
    if (!script) throw new ErrorManager(400, '스크립트를 입력해주세요.');
    const response = await Nlp.ask(script);
    return res.json(response);
  } catch (e) {
    const { message, code } = e;
    return res.status(code).json({ message });
  }
});

module.exports = Router;