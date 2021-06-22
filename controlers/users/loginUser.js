const jwt = require('jsonwebtoken');
const { getRegistrations } = require('../../helpers/dbHelpers');
const { pullUserSchema } = require('../../schemas/userSchema');
const { validation } = require('../../helpers/schemaHelpers');

const loginUser = async (req, res, next) => {
	try {
		const { correo, password } = req.body;

		await validation(pullUserSchema, { correo, password });

		const user = await getRegistrations('usuarios', {
			correo: `${correo}`,
			password: `${password}`,
		});

		if (user.length === 0) {
			const error = new Error('Email o contraseña incorrectos');
			error.httpStatus = 401;
			throw error;
		}

		const tokenInfo = {
			idUser: user[0].id,
			roll: user[0].roll,
			tipo: 'usuario',
		};

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
