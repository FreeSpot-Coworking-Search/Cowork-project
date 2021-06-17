const crypto = require('crypto');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const {
	insertRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { sendMail } = require('../../helpers/mailHelpers');

const postUser = async (req, res, next) => {
	try {
		let newUser = req.body;
		console.log(newUser.password);
		console.log(newUser.correo);

		if (!newUser.password || !newUser.correo) {
			const error = new Error('Faltan datos clave.');
			error.httpStatus = 400;
			throw error;
		}
		const user = await getRegistrations('usuarios', {
			correo: `${newUser.correo}`,
		});

		if (user.length > 0) {
			const error = new Error(
				'Ya existe un usuario registrado con este correo.'
			);
			error.httpStatus = 409;
			throw error;
		}

		const codigo_registro = crypto.randomBytes(16).toString('hex');

		const emailBody = `
            Te acabas de registrar en Diario de Viajes.
            Pulsa en este link para verificar tu cuenta: ${process.env.SERVER_HOST}/users/validate/${codigo_registro}
        `;

		await sendMail({
			to: newUser.correo,
			subject: 'Activa tu usuario de Diario de Viajes',
			body: emailBody,
		});

		newUser = {
			...newUser,
			codigo_registro,
			fecha_creacion: formatDateToDB(new Date()),
		};

		const { insertId } = await insertRegistration('usuarios', newUser);
		req.query.id = insertId;

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postUser;
