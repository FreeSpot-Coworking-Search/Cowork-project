const {
	updateRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');

const path = require('path');

const validatePayment = async (req, res, next) => {
	try {
		const { code: codigo_pago } = req.query;

		if (!codigo_pago) {
			const error = new Error('No existe el código de pago');
			error.httpStatus = 404;
			throw error;
		}

		let objectSearch = {
			codigo_pago,
			pagado: 0,
		};
		const result = await getRegistrations('reservas', objectSearch);

		if (result.lenght === 0) {
			const error = new Error('No existe reserva pendiente de pago');
			error.httpStatus = 401;
		}

		const { id, id_usuario } = result[0];
		const updateObject = {
			codigo_pago: null,
			pagado: 1,
		};
		await updateRegistration('reservas', id, updateObject);
		const filePath = path.join(__dirname, '../../', './static/html');

		console.log('Pago validado en reserva id:', id, 'usuario:', id_usuario);

		res.status(200);
		res.sendFile(filePath + '/validatedPayment.html');
	} catch (error) {
		next(error);
	}
};

module.exports = validatePayment;
