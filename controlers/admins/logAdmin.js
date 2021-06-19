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

		const infoAdmin = {
			idAdmin: admin[0].id,
			roll: admin[0].roll,
		};

		const token = jwt.sign(infoAdmin, process.env.TOKEN_SECRET, {
			expiresIn: '7d',
		});
		console.log(infoAdmin);
		res.send({
			status: 'ok',
			data: {
				token,
				infoAdmin,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = logAdmin;
