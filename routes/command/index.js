const express = require('express');
const Nlp = require('../../helpers/Nlp');
const ErrorManager = require('../../helpers/ErrorManager');
const Router = express.Router();

Router.get('/command', async (req, res) => {
  try {
    const { script } = req.query;
    if (!script) throw new ErrorManager(400, '스크립트를 입력해주세요.');
    const entity = await Nlp.ask(script);
    return res.json(entity);
  } catch (e) {
    const { message, code } = e;
    return res.status(code || 500).json({ message });
  }
});

module.exports = Router;