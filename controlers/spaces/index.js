let express = require('express');
let router = express.Router();

const spaceExists = require('../../middlewares/spaces/spaceExist');
const adminOwnsSpace = require('../../middlewares/spaces/adminOwnsSpace');
const adminIsLogged = require('../../middlewares/admins/adminIsLogged');
const whoIs = require('../../middlewares/admins/whoIs');

const getSpace = require('./getSpace');
const postSpace = require('./postSpace');
const putSpace = require('./putSpace');
const deleteSpace = require('./deleteSpace');

const searchSpaces = require('../searchs/searchSpaces');

const postPhoto = require('../photos/postPhoto');
const deletePhoto = require('../photos/deletePhoto');
const adminOwnsSpaceCenter = require('../../middlewares/spaces/adminOwnsSpaceCenter');

router.get('/', spaceExists, whoIs, getSpace);
router.post('/', adminIsLogged, adminOwnsSpaceCenter, postSpace, getSpace);
router.put('/', spaceExists, adminIsLogged, adminOwnsSpace, putSpace, getSpace);
router.delete('/', spaceExists, adminIsLogged, adminOwnsSpace, deleteSpace);

router.post(
	'/photo/',
	spaceExists,
	adminIsLogged,
	adminOwnsSpace,
	postPhoto,
	getSpace
);
router.delete('/photo/', adminIsLogged, deletePhoto);

router.post('/search/', searchSpaces);

module.exports = router;
