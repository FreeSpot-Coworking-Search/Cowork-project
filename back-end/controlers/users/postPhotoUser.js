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
		if (!req.files || Object.keys(req.files).length === 0) {
			const error = new Error('No se han subido archivos');
			error.httpStatus = 400;
			throw error;
		}
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

		res.status(200);
		res.send(savedPhoto);

		console.log('Cambio de avatar , id:', id);
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoUser;
