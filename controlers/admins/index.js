let express = require('express');
let router = express.Router();

const getAdmin = require('./getAdmin');
const postAdmin = require('./postAdmin');
const validateAdmin = require('./validateAdmin');

router.get('/', getAdmin);
router.get('/validate', validateAdmin);
router.post('/', postAdmin, getAdmin);
//router.post('/login', logAdmin);
//router.put('/', putAdmin);
//router.delete('/', deleleteAdmin);
//router.post('/photo', postPhotoAdmin);

module.exports = router;
