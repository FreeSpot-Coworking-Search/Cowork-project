const { database } = require('faker/lib/locales/en');
const {
	updateRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { savePhoto, removePhoto } = require('../../helpers/photoHelpers');

const postPhotoUser = async (req, res, next) => {
	try {
		const { id } = req.query;

		const user = await getRegistrations('usuarios', { id: `${id}` });

		let savedPhoto;

		if (req.files.photo) {
			savedPhoto = await savePhoto(req.files.photo);
			removePhoto(user[0].foto);
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
