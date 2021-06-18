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
		const { idUser } = req.query;

		const user = await getRegistrations('usuarios', { id: `${idUser}` });

		let savedPhoto;

		if (req.files.photo) {
			savedPhoto = await saveUserPhoto(req.files.photo);
			removeUserPhoto(user[0].foto);
			await updateRegistration('usuarios', idUser, {
				foto: `${savedPhoto}`,
			});
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoUser;
