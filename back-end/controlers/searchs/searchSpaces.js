const {
	getSearchSpaces,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { searchSpacesSchema } = require('../../schemas/searchSchema');

const searchSpaces = async (req, res, next) => {
	try {
		const searchObject = req.query;
		await validation(searchSpacesSchema, searchObject);
		let results = await getSearchSpaces(searchObject);
		console.log(results);

		const [center] = await getRegistrations('centros', {
			id: searchObject.id_centro,
		});

		const {
			nombre,
			direccion,
			localidad,
			codigo_postal,
			telefono,
			email,
			descripcion,
		} = center;

		const centerImages = await getRegistrations('imagenes', {
			id_centro: center.id,
		});

		results = await Promise.all(
			results.map(async (space) => {
				const spaceImages = await getRegistrations('imagenes', {
					id_espacio: space.id,
				});
				const newSpace = { ...space, imagenes: spaceImages };
				return newSpace;
			})
		);

		res.status(200);
		res.send({
			center: {
				nombre,
				direccion,
				localidad,
				codigo_postal,
				telefono,
				email,
				descripcion,
				imagenes: centerImages,
			},
			results,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = searchSpaces;
