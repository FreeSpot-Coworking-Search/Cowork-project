const {
	updateRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');

const path = require('path');

const validateAdmin = async (req, res, next) => {
	try {
		const { code } = req.query;

		if (!code) {
			const error = new Error('Falta el codigo de validación');
			error.httpStatus = 404;
			throw error;
		}

		let objectSearch = {
			codigo_registro: `${code}`,
			activo: 0,
		};

		const results = await getRegistrations('administradores', objectSearch);
		if (results.length === 0) {
			const error = new Error(
				'No existe administrador pendiente de validación'
			);
			error.httpStatus = 401;
			throw error;
		}

		await updateRegistration('administradores', results[0].id, {
			activo: 1,
			codigo_registro: null,
		});
		const filePath = path.join(__dirname, '../../', './static/html');

		console.log('Validación de administrador id:', results[0].id);
		res.status(200);
		res.sendFile(filePath + '/validatedUser.html');
	} catch (error) {
		next(error);
	}
};

module.exports = validateAdmin;
