const express = require('express');
const router = express.Router();

const allReserves = require('./getAllReserves');

const userIsLogin = require('../../middlewares/users/userIsLogin');

router.get('/reserves/allreserves', userIsLogin, allReserves);

module.exports = router;
