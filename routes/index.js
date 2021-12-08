const express = require('express');
const router = express.Router();

router.use(require('./skills'));
router.use(require('./command'));

module.exports = router;
