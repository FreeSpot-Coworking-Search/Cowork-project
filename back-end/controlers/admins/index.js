let express = require('express');
let router = express.Router();

const getAdmin = require('./getAdmin');
const postAdmin = require('./postAdmin');
const validateAdmin = require('./validateAdmin');
const logAdmin = require('./logAdmin');
const deleteAdmin = require('./deleteAdmin');
const putAdmin = require('./putAdmin');
const postPhotoAdmin = require('./postPhotoAdmin');

const adminExists = require('../../middlewares/admins/adminExists');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const adminIsOwner = require('../../middlewares/admins/adminIsOwner');

router.get('/', adminExists, adminIsLogged, adminIsOwner, getAdmin);
router.post('/', postAdmin, getAdmin);
router.get('/validate', validateAdmin);
router.post('/login', logAdmin);
router.delete('/', adminExists, adminIsLogged, adminIsOwner, deleteAdmin);
router.put('/', adminExists, adminIsLogged, adminIsOwner, putAdmin, getAdmin);
router.post(
	'/photo',
	adminExists,
	adminIsLogged,
	adminIsOwner,
	postPhotoAdmin,
	getAdmin
);

module.exports = router;
