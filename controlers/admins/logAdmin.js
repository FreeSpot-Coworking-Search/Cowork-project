const jwt = require('jsonwebtoken');
const { getRegistrations } = require('../../helpers/dbHelpers');

const logAdmin = async (req, res, next) => {
	try {
		const { correo, password } = req.body;

		if (!correo || !password) {
			const error = new Error('Faltan completar correo y/o pasword');
			error.httpStatus = 400;
			throw error;
		}

		const admin = await getRegistrations('administradores', {
			correo: `${correo}`,
			password: `${password}`,
		});

		if (admin.length === 0) {
			const error = new Error('Email o contraseña incorrectos');
			error.httpStatus = 401;
			throw error;
		}

		const tokenInfo = {
			idAuth: admin[0].id,
			roll: admin[0].roll,
			tipo: `administrador`,
		};

		const authorization = jwt.sign(tokenInfo, process.env.TOKEN_SECRET, {
			expiresIn: '7d',
		});

		res.send({
			status: 'ok',
			data: {
				authorization,
				tokenInfo,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = logAdmin;
