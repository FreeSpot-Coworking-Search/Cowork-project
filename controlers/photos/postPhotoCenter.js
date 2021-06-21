const {
	insertRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { saveSpacesCentersPhoto } = require('../../helpers/photoHelpers');
const { MAX_CENTER_PHOTOS, MAX_SPACE_PHOTOS } = process.env;

const postPhotoCenter = async (req, res, next) => {
	try {
		const { id, description } = req.query;

		if (!req.files || Object.keys(req.files).length === 0) {
			const error = new Error('No se han subido archivos');
			error.httpStatus = 400;
			throw error;
		}

		const url = req.originalUrl;
		const route = url.slice(url.indexOf('/', 1) + 1, url.indexOf('/', 5));

		const idOptions = {
			spaces: 'id_espacio',
			centers: 'id_centro',
		};
		const choosedId = idOptions[`${route}`];

		const maxPhotos =
			route === 'spaces' ? MAX_SPACE_PHOTOS : MAX_CENTER_PHOTOS;

		const query = `SELECT * FROM imagenes WHERE ${choosedId} = ${id}`;
		const photos = await getRegistrations(query);

		if (photos.length >= Number(maxPhotos)) {
			const error = new Error(
				`Se han superado el máximo de ${maxPhotos} fotos permitidas.`
			);
			error.httpStatus = 406;
			throw error;
		}

		const photoName = await saveSpacesCentersPhoto(req.files.photo);

		const insertObject = {
			URL: photoName,
			descripcion: description,
			[choosedId]: id,
		};
		const { insertId } = await insertRegistration('imagenes', insertObject);

		console.log(`Foto subida, ${choosedId}: ${id}, id foto: ${insertId}`);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoCenter;
