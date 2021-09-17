const jwt = require('jsonwebtoken');

const adminIsLogged = (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			const error = new Error(
				'Debes loguearte para poder realizar esta acción'
			);
			error.httpStatus = 401;
			throw error;
		}

		let tokenInfo;
		try {
			tokenInfo = jwt.verify(authorization, process.env.TOKEN_SECRET);
		} catch (error) {
			const err = new Error('Contraseña incorrecta');
			err.httpStatus = 401;
			throw err;
		}

		if (tokenInfo.tipo !== 'administrador') {
			const error2 = new Error('El cliente no es de tipo administrador');
			error2.httpStatus = 401;
			throw error2;
		}

		req.auth = tokenInfo;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminIsLogged;
