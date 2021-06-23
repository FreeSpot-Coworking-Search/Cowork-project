const express = require('express');
const router = express.Router();

const getReserves = require('./getReserves');
const postReserve = require('./postReserve');

const entityExists = require('../../middlewares/centers/entityExists');
const userIsLogin = require('../../middlewares/users/userIsLogin');
const userOwnsReserve = require('../../middlewares/reserves/userOwnsReserve');

router.get('/allreserves', userIsLogin, getReserves);
router.get('/', entityExists, userIsLogin, userOwnsReserve, getReserves);
router.post('/', userIsLogin, postReserve, getReserves);

module.exports = router;
