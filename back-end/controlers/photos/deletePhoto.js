const { getRegistrations } = require('../../helpers/dbHelpers');
const { removeSpacesCentersPhoto } = require('../../helpers/photoHelpers');

const deletePhoto = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idAuth } = req.auth;

		const url = req.originalUrl;
		const route = url.slice(url.indexOf('/', 1) + 1, url.indexOf('/', 5));

		const routeId = route === 'spaces' ? 'id_espacio' : 'id_centro';
		const routeName = route === 'spaces' ? 'espacios' : 'centros';

		let imageSearch;
		if (route === 'spaces') {
			imageSearch = await getRegistrations(
				`SELECT * FROM imagenes I 
				JOIN ${routeName} E ON E.id = I.${routeId}
				JOIN centros C ON C.id = E.id_centro
				WHERE C.id_administrador = ${idAuth} AND I.id = ${id};`
			);
		} else {
			imageSearch = await getRegistrations(
				`SELECT * FROM imagenes I 
				JOIN ${routeName} C ON C.id = I.${routeId}
				WHERE C.id_administrador = ${idAuth} AND I.id = ${id};`
			);
		}

		if (imageSearch.length === 0) {
			const error = new Error('La foto buscada no existe');
			error.httpStatus = 401;
			throw error;
		}

		removeSpacesCentersPhoto(imageSearch[0].URL);
		getRegistrations(`DELETE FROM imagenes WHERE id = ${id};`);

		console.log(
			'Borrado de imagen id:',
			id,
			`, ${routeId}:`,
			imageSearch[0][routeId]
		);
		res.status(200);
		res.send('Imagen borrada');
	} catch (error) {
		next(error);
	}
};

module.exports = deletePhoto;
