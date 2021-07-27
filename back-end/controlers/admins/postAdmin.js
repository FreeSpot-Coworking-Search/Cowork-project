const crypto = require('crypto');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const {
	insertRegistration,
	getRegistrations,
	updateRegistration,
} = require('../../helpers/dbHelpers');
const { saveAdminPhoto } = require('../../helpers/photoHelpers');
const { sendMail } = require('../../helpers/mailHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { postAdminSchema } = require('../../schemas/adminSchema');
const bcrypt = require('bcryptjs');

const postAdmin = async (req, res, next) => {
	try {
		console.log(req.files);
		if (!req.body) {
			const error = new Error('No se han subido archivos');
			error.httpStatus = 400;
			throw error;
		}

		let newAdmin = req.body;
		delete newAdmin.photo;
		const { password } = newAdmin;

		await validation(postAdminSchema, newAdmin);

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
			subject:
				'Activa tu administrador de Coworking Proyect <Hack a Boss>',
			body: emailBody,
		});

		const passwordHash = await bcrypt.hash(password, 10);
		delete newAdmin.password;

		newAdmin = {
			...newAdmin,
			password: passwordHash,
			codigo_registro,
			fecha_creacion: formatDateToDB(new Date()),
		};

		const { insertId } = await insertRegistration(
			'administradores',
			newAdmin
		);

		if (req.files) {
			let savedPhoto = await saveAdminPhoto(req.files.photo);
			await updateRegistration('administradores', insertId, {
				foto: `${savedPhoto}`,
			});
		}

		console.log('Creacion de administrador id:', insertId);

		res.status(200);
		res.send({
			message: 'Admin created',
		});
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postAdmin;
