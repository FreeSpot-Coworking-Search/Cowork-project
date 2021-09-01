const {
	updateRegistration,
	insertRegistration,
	deleteRegistrations,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putSpaceSchema } = require('../../schemas/spaceSchema');

const putSpace = async (req, res, next) => {
	try {
		const { id } = req.query;
		const updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putSpaceSchema, updateObject);

		await deleteRegistrations('espacios_servicios', {
			id_espacio: `${id}`,
		});
		const { servicios, servicios_extra } = updateObject;
		delete updateObject.servicios;
		delete updateObject.servicios_extra;

		for (const servicio of servicios) {
			const insertService = {
				id_espacio: id,
				id_servicio: servicio.id,
			};
			await insertRegistration('espacios_servicios', insertService);
		}
		for (const servicio_extra of servicios_extra) {
			const insertService = {
				id_espacio: id,
				id_servicio: servicio_extra.id,
				precio: servicio_extra.precio,
			};
			await insertRegistration('espacios_servicios', insertService);
		}

		await updateRegistration('espacios', id, updateObject);
		console.log('Modificado espacio, Id:', id);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putSpace;
