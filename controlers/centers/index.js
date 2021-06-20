const express = require('express');
const router = express.Router();

const getCenter = require('./getCenter');

const entityExists = require('../../middlewares/centers/entityExists');
/* 
const postSpace = require('./postSpace');
const putSpace = require('./putSpace');
const deleteSpace = require('./deleteSpace');

const postPhotoSpace = require('../photos/postPhotoSpace');
const deletePhotoSpace = require('../photos/deletePhotoSpace');

router.post('/', postSpace, getSpace);
router.put('/', spaceExists, putSpace, getSpace);
router.delete('/', spaceExists, deleteSpace);

router.post('/photo/', spaceExists, postPhotoSpace, getSpace);
router.delete('/photo/', deletePhotoSpace, getSpace);

 */
router.get('/', entityExists, getCenter);

module.exports = router;
