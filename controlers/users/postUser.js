const crypto = require('crypto');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const {
	insertRegistration,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { sendMail } = require('../../helpers/mailHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const postUserSchema = require('../../schemas/postUserSchema');

const postUser = async (req, res, next) => {
	try {
		let newUser = req.body;

		await validation(postUserSchema, newUser);

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
            Bienvenido a Coworking Proyect <Hack a Boss>.
            Estas a punto de terminar: <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/users/validate/?code=${codigo_registro}">
			Haz click aquí para finalizar tu registro</a>
        `;

		await sendMail({
			to: newUser.correo,
			subject: 'Activa tu usuario de Coworking Proyect <Hack a Boss>',
			body: emailBody,
		});

		newUser = {
			...newUser,
			codigo_registro,
			fecha_creacion: formatDateToDB(new Date()),
		};

		const { insertId } = await insertRegistration('usuarios', newUser);
		req.query.idUser = insertId;

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postUser;
