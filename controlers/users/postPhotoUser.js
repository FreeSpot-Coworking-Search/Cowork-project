const {
	updateRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const {
	saveUserPhoto,
	removeUserPhoto,
} = require('../../helpers/photoHelpers');

const postPhotoUser = async (req, res, next) => {
	try {
		const { id } = req.query;

		const user = await getRegistrations('usuarios', { id: `${id}` });

		let savedPhoto;

		if (req.files.photo) {
			savedPhoto = await saveUserPhoto(req.files.photo);
			removeUserPhoto(user[0].foto);
			await updateRegistration('usuarios', id, {
				foto: `${savedPhoto}`,
			});
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoUser;
