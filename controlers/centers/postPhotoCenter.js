const {
	insertRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { saveSpacesCentersPhoto } = require('../../helpers/photoHelpers');
const { MAX_CENTER_PHOTOS } = process.env;

const postPhotoCenter = async (req, res, next) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			const error = new Error('No se han subido archivos');
			error.httpStatus = 400;
			throw error;
		}

		const { id, description } = req.query;

		const query = `SELECT * FROM imagenes WHERE id_centro = ${id}`;
		const photos = await getRegistrations(query);

		if (photos.length > Number(MAX_CENTER_PHOTOS)) {
			const error = new Error(
				'Se han superado el máximo de fotos permitidas para este centro.'
			);
			error.httpStatus = 406;
			throw error;
		}

		const photoName = await saveSpacesCentersPhoto(req.files.photo);

		const insertObject = {
			URL: photoName,
			descripcion: description,
			id_centro: id,
		};
		const { insertId } = await insertRegistration('imagenes', insertObject);

		console.log(`Foto subida, id centro: ${id}, id foto: ${insertId}`);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postPhotoCenter;

/* 
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
URL VARCHAR(512) NOT NULL,
descripcion VARCHAR(200),
id_centro INT UNSIGNED,
FOREIGN KEY (id_centro) REFERENCES centros(id),
id_espacio INT UNSIGNED,
FOREIGN KEY (id_espacio) REFERENCES espacios(id)
*/
