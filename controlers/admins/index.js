let express = require('express');
let router = express.Router();

const getAdmin = require('./getAdmin');
const postAdmin = require('./postAdmin');
const validateAdmin = require('./validateAdmin');
const logAdmin = require('./logAdmin');

const adminExists = require('../../middlewares/admins/adminExists');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const adminIsOwner = require('../../middlewares/admins/adminIsOwner');

router.get('/', adminIsLogged, adminExists, adminIsOwner, getAdmin);
router.post('/', postAdmin, getAdmin);
router.get('/validate', validateAdmin);
router.post('/login', logAdmin);
//router.put('/', putAdmin);
//router.delete('/', deleleteAdmin);
//router.post('/photo', postPhotoAdmin);

module.exports = router;
