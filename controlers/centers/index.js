const express = require('express');
const router = express.Router();

const getCenter = require('./getCenter');
const postCenter = require('./postCenter');

const entityExists = require('../../middlewares/centers/entityExists');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const adminIsOwner = require('../../middlewares/admins/adminIsOwner');
/* 
const putSpace = require('./putSpace');
const deleteSpace = require('./deleteSpace');

const postPhotoSpace = require('../photos/postPhotoSpace');
const deletePhotoSpace = require('../photos/deletePhotoSpace');

router.put('/', spaceExists, putSpace, getSpace);
router.delete('/', spaceExists, deleteSpace);
router.post('/photo/', spaceExists, postPhotoSpace, getSpace);
router.delete('/photo/', deletePhotoSpace, getSpace);

*/
router.get('/', entityExists, getCenter);
router.post('/', adminIsLogged, postCenter, getCenter);

module.exports = router;
