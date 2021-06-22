let express = require('express');
let router = express.Router();

const spaceExists = require('../../middlewares/spaces/spaceExist');
const adminOwnsSpace = require('../../middlewares/spaces/adminOwnsSpace');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');

const getSpace = require('./getSpace');
const postSpace = require('./postSpace');
const putSpace = require('./putSpace');
const deleteSpace = require('./deleteSpace');

const postPhotoSpace = require('../photos/postPhotoSpace');
const deletePhotoSpace = require('../photos/deletePhotoSpace');
const adminOwnsSpaceCenter = require('../../middlewares/spaces/adminOwnsSpaceCenter');

router.get('/', getSpace);
router.post('/', adminIsLogged, adminOwnsSpaceCenter, postSpace, getSpace);
router.put('/', spaceExists, adminIsLogged, adminOwnsSpace, putSpace, getSpace);
router.delete('/', spaceExists, adminIsLogged, adminOwnsSpace, deleteSpace);

router.post(
	'/photo/',
	spaceExists,
	adminIsLogged,
	adminOwnsSpace,
	postPhotoSpace,
	getSpace
);
router.delete(
	'/photo/',
	spaceExists,
	adminIsLogged,
	adminOwnsSpace,
	deletePhotoSpace,
	getSpace
);

module.exports = router;
