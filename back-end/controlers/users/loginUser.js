const jwt = require('jsonwebtoken');
const { getRegistrations } = require('../../helpers/dbHelpers');
const { putUserSchema } = require('../../schemas/userSchema');
const { validation } = require('../../helpers/schemaHelpers');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res, next) => {
	try {
		const { correo, password } = req.body;

		if (!correo || !password) {
			const error = new Error('Faltan completar correo y/o pasword');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putUserSchema, { correo, password });

		const user = await getRegistrations('usuarios', {
			correo: `${correo}`,
		});

		if (user.length === 0) {
			const error = new Error('El usuario no existe');
			error.httpStatus = 401;
			throw error;
		}

		if (user[0].activo === 0) {
			const error = new Error('El usuario no ha sido activado aún.');
			error.httpStatus = 401;
			throw error;
		}

		const isValidPassword = await bcrypt.compare(
			password,
			user[0].password
		);

		if (!isValidPassword) {
			const error = new Error('El password no es válido');
			error.code = 401;
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

		console.log('Login de usuario id:', user[0].id);
		res.send({
			authorization: token,
			tokenInfo,
			avatarUrl: user[0].foto,
			name: user[0].nombre,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = loginUser;
