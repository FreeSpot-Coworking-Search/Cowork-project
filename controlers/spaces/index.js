let express = require('express');
let router = express.Router();

const spaceExists = require('../../middlewares/spaces/spaceExist');

const getSpace = require('./getSpace');
const postSpace = require('./postSpace');
const putSpace = require('./putSpace');
const deleteSpace = require('./deleteSpace');

const postPhotoSpace = require('../photos/postPhotoSpace');
const deletePhotoSpace = require('../photos/deletePhotoSpace');

router.get('/', getSpace);
router.post('/', postSpace, getSpace);
router.put('/', spaceExists, putSpace, getSpace);
router.delete('/', spaceExists, deleteSpace);

router.post('/photo/', spaceExists, postPhotoSpace, getSpace);
router.delete('/photo/', deletePhotoSpace, getSpace);

module.exports = router;
