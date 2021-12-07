const { NlpManager } = require('node-nlp');
const commands = require('../commands');
const express = require('express');
const router = express.Router();

router.use(require('./skills'));

module.exports = router;
