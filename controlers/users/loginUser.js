const jwt = require('jsonwebtoken');
const { getRegistrations } = require('../../helpers/dbHelpers');

const loginUser = async (req, res, next) => {
	try {
		const { correo, password } = req.body;

		if (!correo || !password) {
			const error = new Error('Faltan login y/o pasword');
			error.httpStatus = 400;
			throw error;
		}

		const [user] = await getRegistrations('usuarios', {
			correo: `${correo}`,
			password: `${password}`,
		});
		if (user.length === 0) {
			const error = new Error('Email o contraseña incorrectos');
			error.httpStatus = 401;
			throw error;
		}

		const tokenInfo = {
			idUser: user.id,
			roll: user.roll,
		};

		// Creamos el token.
		const token = jwt.sign(tokenInfo, process.env.TOKEN_SECRET, {
			expiresIn: '7d',
		});

		res.send({
			status: 'ok',
			data: {
				token,
				tokenInfo,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = loginUser;
