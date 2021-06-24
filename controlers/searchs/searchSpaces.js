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
		const result = await getSearchSpaces(searchObject);

		const [center] = await getRegistrations('centros', {
			id: searchObject.id_centro,
		});

		const { nombre, direccion, localidad, codigo_postal, telefono, email } =
			center;

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
