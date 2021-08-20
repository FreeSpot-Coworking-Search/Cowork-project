const express = require('express');
const router = express.Router();

const getCenter = require('./getCenter');
const getCenter2 = require('./getCenter2');
const postCenter = require('./postCenter');
const putCenter = require('./putCenter');
const deleteCenter = require('./deleteCenter');
const postPhoto = require('../photos/postPhoto');
const deletePhoto = require('../photos/deletePhoto');

const entityExists = require('../../middlewares/centers/entityExists');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const adminOwnsCenter = require('../../middlewares/centers/adminOwnsCenter');
const whoIs = require('../../middlewares/admins/whoIs');

router.get('/', whoIs, entityExists, getCenter);
router.post('/', adminIsLogged, postCenter, getCenter);
router.put(
	'/',
	entityExists,
	adminIsLogged,
	adminOwnsCenter,
	putCenter,
	getCenter
);
router.delete('/', entityExists, adminIsLogged, adminOwnsCenter, deleteCenter);

router.post(
	'/photo/',
	entityExists,
	adminIsLogged,
	adminOwnsCenter,
	postPhoto,
	getCenter
);

router.delete('/photo/', adminIsLogged, deletePhoto);

module.exports = router;
