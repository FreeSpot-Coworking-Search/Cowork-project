const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putIncidenceSchema } = require('../../schemas/incidenceSchema');

const putIncidence = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idAuth } = req.auth;
		const { estado, id_reserva } = req.infoReserve;
		let updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta Update');
			error.httpStatus = 400;
			throw error;
		}

		if (estado === 1) {
			const error = new Error('La incidencia ya ha sido finalizada.');
			error.httpStatus = 403;
			throw error;
		}

		await validation(putIncidenceSchema, updateObject);

		updateObject = {
			...updateObject,
			estado: 1,
		};

		await updateRegistration('incidencias', id, updateObject);

		console.log(
			'Finalizada incidencia id:',
			id,
			'administrador id:',
			idAuth
		);
		req.query.id = id_reserva;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putIncidence;
