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
		//atento al manejo de errores... HAY QUE CAMBIAR [user] por user
		const [user] = await getRegistrations('usuarios', {
			correo: `${correo}`,
			password: `${password}`,
		});
		//cuando el getRegistration no encuentra el no funciona correctamente este error ya que user === undefined
		if (user.length === 0) {
			const error = new Error('Email o contraseña incorrectos');
			error.httpStatus = 401;
			throw error;
		}

		const tokenInfo = {
			//y aquí hay que cambiar  user.id por user[0].id y user.roll por user[0].roll
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
