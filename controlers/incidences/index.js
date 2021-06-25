const express = require('express');
const router = express.Router();

const getUserIncidences = require('./getUserIncidences');
const getIncidences = require('./getIncidences');
const postIncidence = require('./postIncidence');
const putIncidence = require('./putIncidence');

const entityExists = require('../../middlewares/centers/entityExists');
const userIsLogin = require('../../middlewares/users/userIsLogin');
const userOwnsReserve = require('../../middlewares/reserves/userOwnsReserve');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const adminOwnsReserve = require('../../middlewares/reserves/adminOwnsReserve');

router.get('/allincidences/', userIsLogin, getUserIncidences);
router.get('/', entityExists, userIsLogin, userOwnsReserve, getIncidences);
router.post('/', userIsLogin, userOwnsReserve, postIncidence, getIncidences);
router.put(
	'/',
	entityExists,
	adminIsLogged,
	adminOwnsReserve,
	putIncidence,
	getIncidences
);

module.exports = router;
