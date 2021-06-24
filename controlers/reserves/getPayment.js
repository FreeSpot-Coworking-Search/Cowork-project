const {
	getRegistrations,
	updateRegistration,
} = require('../../helpers/dbHelpers');
const crypto = require('crypto');
const { sendMail } = require('../../helpers/mailHelpers');

const getPayment = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idUser: id_usuario } = req.userAuth;
		const { pagado } = req.infoReserve;

		if (pagado === 1) {
			const error = new Error('La reserva ya ha sido abonada');
			error.httpStatus = 403;
			throw error;
		}

		const codigo_pago = crypto.randomBytes(16).toString('hex');

		const emailBody = `
            Enlace de Coworking Proyect <Hack a Boss>.
            Para abonar tu reserva accede al siguiente enlace: <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/reserves/validate/?code=${codigo_pago}">Abonar Reserva</a>
        `;

		const result = await getRegistrations('usuarios', { id: id_usuario });
		const correo = result[0].correo;

		await sendMail({
			to: correo,
			subject: 'Abona tu reserva en Coworking Proyect <Hack a Boss>',
			body: emailBody,
		});

		const updateObject = {
			codigo_pago,
		};
		await updateRegistration('reservas', id, updateObject);

		console.log(
			'Solicitud de pago realizado en reserva id:',
			id,
			'usuario:',
			id_usuario
		);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = getPayment;
