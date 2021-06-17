const { getRegistrations } = require('../../helpers/dbHelpers');
const { removeSpacesCentersPhoto } = require('../../helpers/photoHelpers');

const deletePhotoSpace = async (req, res, next) => {
	try {
		const { idFoto } = req.query;

		const images = await getRegistrations(
			`SELECT * FROM imagenes WHERE id = ${idFoto};`
		);

		if (images.length <= 0) {
			const error = new Error('La foto no existe');
			error.httpStatus = 401;
			throw error;
		} else {
			removeSpacesCentersPhoto(images[0].URL);
			getRegistrations(`DELETE FROM imagenes WHERE id = ${idFoto};`);
		}
		res.status(200);
		res.send('Imagen borrada');
	} catch (error) {
		next(error);
	}
};

module.exports = deletePhotoSpace;
