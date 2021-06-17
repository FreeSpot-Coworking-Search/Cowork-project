let express = require('express');
let router = express.Router();

const getAdmin = require('./getAdmin');
router.get('/', getAdmin);

const postAdmin = require('./postAdmin');
router.post('/', postAdmin);

const logAdmin = require('./logAdmin');
router.post('/login', logAdmin);

module.exports = router;
