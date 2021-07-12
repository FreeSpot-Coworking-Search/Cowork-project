let express = require('express');
let router = express.Router();

const getReset = require('./getReset');
const postPopulate = require('./postPopulate');

router.get('/', getReset);
router.post('/', postPopulate);

module.exports = router;
