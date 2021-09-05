const express = require('express');
const router = express.Router();

const getReserves = require('./getReserves');
const getAllReserves = require('./getAllReserves');
const postReserve = require('./postReserve');
const putRate = require('./putRate');
const getPayment = require('./getPayment');
const validatePayment = require('./validatePayment');

const entityExists = require('../../middlewares/centers/entityExists');
const userIsLogin = require('../../middlewares/users/userIsLogin');
const userOwnsReserve = require('../../middlewares/reserves/userOwnsReserve');

router.get('/allreserves/', userIsLogin, getAllReserves);
router.get('/', entityExists, userIsLogin, userOwnsReserve, getReserves);
router.post('/', userIsLogin, postReserve);
router.put(
	'/rate/',
	entityExists,
	userIsLogin,
	userOwnsReserve,
	putRate,
	getReserves
);
router.get(
	'/payment/',
	entityExists,
	userIsLogin,
	userOwnsReserve,
	getPayment,
	getReserves
);
router.get('/validate/', validatePayment);

module.exports = router;
