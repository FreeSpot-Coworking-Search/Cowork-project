const express = require('express');
const router = express.Router();

const myCenter = require('./myCenter');

const adminExists = require('../../middlewares/admins/adminExists');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const adminIsOwner = require('../../middlewares/admins/adminIsOwner');

router.get(
	'/',
	// adminExists, adminIsLogged, adminIsOwner,
	myCenter
);

module.exports = router;
