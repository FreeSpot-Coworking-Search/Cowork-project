const { insertRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { postSpaceSchema } = require('../../schemas/spaceSchema');

const postSpace = async (req, res, next) => {
	try {
		const newSpace = req.body;
		const { servicios, servicios_extra } = newSpace;
		delete newSpace.servicios;
		delete newSpace.servicios_extra;

		await validation(postSpaceSchema, newSpace);
		const { insertId } = await insertRegistration('espacios', newSpace);

		for (const servicio of servicios) {
			const insertService = {
				id_espacio: insertId,
				id_servicio: servicio.id,
			};
			await insertRegistration('espacios_servicios', insertService);
		}
		for (const servicio of servicios_extra) {
			const insertService = {
				id_espacio: insertId,
				id_servicio: servicio.id,
				precio: servicio.precio,
			};
			await insertRegistration('espacios_servicios', insertService);
		}

		req.query.id = insertId;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postSpace;
