const express = require('express');
const router = express.Router();

const searchCenters = require('../searchs/searchCenters');
const searchSpaces = require('./searchSpaces');

router.get('/center', searchCenters);
router.get('/space', searchSpaces);

module.exports = router;
