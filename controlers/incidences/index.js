const express = require('express');
const router = express.Router();

const getUserIncidences = require('./getUserIncidences');
const getIncidences = require('./getIncidences');

const entityExists = require('../../middlewares/centers/entityExists');
const userIsLogin = require('../../middlewares/users/userIsLogin');
const userOwnsReserve = require('../../middlewares/reserves/userOwnsReserve');

router.get('/allincidences/', userIsLogin, getUserIncidences);
router.get('/', entityExists, userIsLogin, userOwnsReserve, getIncidences);

module.exports = router;
