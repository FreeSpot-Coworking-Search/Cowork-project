let express = require('express');
let router = express.Router();

router.use('/adminsPhotos/', express.static('static/uploads/adminsPhotos'));
router.use('/usersPhotos/', express.static('static/uploads/usersPhotos'));
router.use(
	'/spacesCentersPhotos/',
	express.static('static/uploads/spacesCentersPhotos')
);
//router.use('/', express.static('static'));

module.exports = router;
