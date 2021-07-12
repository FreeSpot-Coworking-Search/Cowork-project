const {
	getSearchSpaces,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { searchSpacesSchema } = require('../../schemas/searchSchema');

const searchSpaces = async (req, res, next) => {
	try {
		const searchObject = req.body;
		await validation(searchSpacesSchema, searchObject);
		let result = await getSearchSpaces(searchObject);

		const [center] = await getRegistrations('centros', {
			id: searchObject.id_centro,
		});

		const { nombre, direccion, localidad, codigo_postal, telefono, email } =
			center;

		result = await result.map(async (center) => {
			const [images] = await getRegistrations('imagenes', {
				id_centro: center.id,
			});
			console.log(images);
			const newCenter = { ...center, imagenes: images };
			return newCenter;
		});

		res.status(200);
		res.send({
			status: 'ok',
			center: {
				nombre,
				direccion,
				localidad,
				codigo_postal,
				telefono,
				email,
			},
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = searchSpaces;
