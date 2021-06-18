let express = require('express');
let router = express.Router();

const getAdmin = require('./getAdmin');
const postAdmin = require('./postAdmin');
const logAdmin = require('./logAdmin');

router.get('/', getAdmin);
router.post('/', postAdmin, getAdmin);
router.post('/login', logAdmin);
//router.put('/', putAdmin);
//router.delete('/', deleleteAdmin);
//router.post('/photo', postPhotoAdmin);

module.exports = router;
