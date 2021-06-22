const { getRegistrations } = require('../../helpers/dbHelpers');
const { removeSpacesCentersPhoto } = require('../../helpers/photoHelpers');

const deletePhotoCenter = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idAuth } = req.adminAuth;

		const imageSearch = await getRegistrations(
			`SELECT * FROM imagenes I JOIN centros C ON C.id = I.id_centro
							JOIN administradores A ON A.id = C.id_administrador
			WHERE A.id = ${idAuth} AND I.id = ${id};`
		);

		if (imageSearch.length === 0) {
			const error = new Error('La foto buscada no existe');
			error.httpStatus = 401;
			throw error;
		}

		removeSpacesCentersPhoto(imageSearch[0].URL);
		getRegistrations(`DELETE FROM imagenes WHERE id = ${id};`);

		console.log(
			`Borrado de imagen id ${id}, centro ${imageSearch[0].id_centro}`
		);
		res.status(200);
		res.send('Imagen borrada');
	} catch (error) {
		next(error);
	}
};

module.exports = deletePhotoCenter;
