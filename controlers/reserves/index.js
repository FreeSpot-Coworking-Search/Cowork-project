const express = require('express');
const router = express.Router();

const getReserves = require('./getReserves');

const entityExists = require('../../middlewares/centers/entityExists');
const userIsLogin = require('../../middlewares/users/userIsLogin');
const userOwnsReserve = require('../../middlewares/reserves/userOwnsReserve');

router.get('/allreserves', userIsLogin, getReserves);
router.get('/', entityExists, userIsLogin, userOwnsReserve, getReserves);

module.exports = router;
