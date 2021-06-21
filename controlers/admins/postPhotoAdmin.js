const {
	updateRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const {
	saveAdminPhoto,
	removeAdminPhoto,
} = require('../../helpers/photoHelpers');

const postPhotoAdmin = async (req, res, next) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			const error = new Error('No se han subido archivos');
			error.httpStatus = 400;
			throw error;
		}

		const { id } = req.query;
		const admin = await getRegistrations('administradores', {
			id: `${id}`,
		});
		/* 
		if (req.files.photo) {
			savedPhoto = await saveUserPhoto(
				req.files.photo,
				req.route.stack[0].name
			);
			removeUserPhoto(user[0].foto);
			await updateRegistration('usuarios', idUser, {
				foto: `${savedPhoto}`,
			});
		}
 */
		let savedPhoto = await saveAdminPhoto(req.files.photo);
		removeAdminPhoto(admin[0].foto);
		await updateRegistration('administradores', id, {
			foto: `${savedPhoto}`,
		});

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoAdmin;
