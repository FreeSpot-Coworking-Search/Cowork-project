const {
	insertRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { saveSpacesCentersPhoto } = require('../../helpers/photoHelpers');
const { MAX_SPACE_PHOTOS } = process.env;

const postPhotoSpace = async (req, res, next) => {
	try {
		const { id } = req.query;
		let { description } = req.query;

		description = !description ? '' : description;

		const images = await getRegistrations(
			`SELECT * FROM imagenes WHERE id_espacio = ${id};`
		);
		let savedPhoto;

		if (images.length < Number(MAX_SPACE_PHOTOS)) {
			if (req.files.photo) {
				savedPhoto = await saveSpacesCentersPhoto(req.files.photo);
				await insertRegistration('imagenes', {
					id_espacio: `${id}`,
					URL: `${savedPhoto}`,
					descripcion: `${description}`,
				});
			}
		} else {
			const error = new Error('Limite de fotos alcanzado');
			error.httpStatus = 401;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoSpace;
