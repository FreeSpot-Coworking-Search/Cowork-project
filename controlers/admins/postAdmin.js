const crypto = require('crypto');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const {
	insertRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { sendMail } = require('../../helpers/mailHelpers');

const postAdmin = async (req, res, next) => {
	try {
		let newAdmin = req.body;

		if (!newAdmin.password || !newAdmin.correo) {
			const error = new Error('Faltan datos clave.');
			error.httpStatus = 400;
			throw error;
		}

		const admin = await getRegistrations('administradores', {
			correo: `${newAdmin.correo}`,
		});

		if (admin.length > 0) {
			const error = new Error(
				'Ya existe un administrador registrado con este correo.'
			);
			error.httpStatus = 409;
			throw error;
		}

		const codigo_registro = crypto.randomBytes(16).toString('hex');

		const emailBody = `
            Bienvenido a Coworking Proyect <Hack a Boss>.
            Estas a punto de terminar: <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/admins/validate/?code=${codigo_registro}">Haz click aquí parea finalizar tu registro.</a>
        `;

		await sendMail({
			to: newAdmin.correo,
			subject: 'Activa tu usuario de Coworking Proyect <Hack a Boss>',
			body: emailBody,
		});

		newAdmin = {
			...newAdmin,
			codigo_registro,
			fecha_creacion: formatDateToDB(new Date()),
		};

		const { insertId } = await insertRegistration(
			'administradores',
			newAdmin
		);

		if (insertId === undefined) {
			const error = new Error(
				'El administrador no se pudo crear por falta de campos requeridos'
			);
			error.httpStatus = 409;
			throw error;
		}

		console.log(insertId);

		req.query.id = insertId.inserId;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postAdmin;
