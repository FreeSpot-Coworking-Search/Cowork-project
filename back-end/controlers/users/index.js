let express = require('express');
let router = express.Router();

const getUser = require('./getUser');
const postUser = require('./postUser');
const putUser = require('./putUser');
const deleteUser = require('./deleteUser');
const loginUser = require('./loginUser');
const validateUser = require('./validateUser');

const userExists = require('../../middlewares/users/userExists');
const userIsLogin = require('../../middlewares/users/userIsLogin');
const userIsOwner = require('../../middlewares/users/userIsOwner');

const postPhotoUser = require('./postPhotoUser');

router.post('/login/', loginUser);
router.get('/validate/', validateUser);
router.get('/', getUser);
router.post('/', postUser);
router.put('/', userIsLogin, userIsOwner, userExists, putUser, getUser);
router.delete('/', userIsLogin, userExists, deleteUser);
router.post('/photo/', postPhotoUser, getUser);

module.exports = router;
