const {
	updateRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');

const validateUser = async (req, res, next) => {
	try {
		const { code } = req.query;

		let objectSearch;
		if (code) {
			objectSearch = {
				codigo_registro: `${code}`,
				activo: 0,
			};
		} else {
			const error = new Error('Falta el codigo de validación');
			error.httpStatus = 404;
			throw error;
		}

		const results = await getRegistrations('usuarios', objectSearch);
		if (results.length === 0) {
			const error = new Error(
				'No existe usuario pendiente de validación'
			);
			error.httpStatus = 401;
			throw error;
		} else {
			await updateRegistration('usuarios', results[0].id, { activo: 1 });
		}
		res.status(200);
		res.send({
			status: 'ok',
			data: 'Usuario validado!',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = validateUser;
