const {
	getRegistrations,
	updateRegistration,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putSpaceSchema } = require('../../schemas/spaceSchema');

const putCleaning = async (req, res, next) => {
	try {
		const { id_espacio } = req.infoReserve;
		const updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putSpaceSchema, updateObject);

		const response = await updateRegistration(
			'espacios',
			id_espacio,
			updateObject
		);

		if (typeof response !== 'boolean') {
			const error = new Error(
				'Hubo un error al actualizar el estado del limpieza del espacio.'
			);
			error.httpStatus = 400;
			throw error;
		}
		console.log(
			'Modificado estado de limpieza de espacio, Id:',
			id_espacio,
			'Estado: ',
			response
		);
		res.httpStatus = 200;
		res.send(response);
	} catch (error) {
		next(error);
	}
};

module.exports = putCleaning;
