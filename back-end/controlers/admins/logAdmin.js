const jwt = require('jsonwebtoken');
const { getRegistrations } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putAdminSchema } = require('../../schemas/adminSchema');
const bcrypt = require('bcryptjs');

const logAdmin = async (req, res, next) => {
	try {
		const { correo, password } = req.body;

		if (!correo || !password) {
			const error = new Error('Faltan completar correo y/o pasword');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putAdminSchema, { correo, password });

		const admin = await getRegistrations('administradores', {
			correo: `${correo}`,
		});

		if (admin.length === 0) {
			const error = new Error('El administrador no existe');
			error.httpStatus = 401;
			throw error;
		}

		const isValidPassword = await bcrypt.compare(
			password,
			admin[0].password
		);

		if (!isValidPassword) {
			const error = new Error('El password no es válido');
			error.httpStatus = 401;
			throw error;
		}

		const tokenInfo = {
			idAuth: admin[0].id,
			roll: admin[0].roll,
			tipo: 'administrador',
		};

		const authorization = jwt.sign(tokenInfo, process.env.TOKEN_SECRET, {
			expiresIn: '7d',
		});

		console.log('Login de administrador id:', admin[0].id);
		res.send({
			status: 'ok',
			data: {
				authorization,
				tokenInfo,
				avatarUrl: admin[0].foto,
				name: admin[0].nombre,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = logAdmin;
