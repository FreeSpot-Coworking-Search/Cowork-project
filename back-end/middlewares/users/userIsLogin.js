const jwt = require('jsonwebtoken');

const userIsLogin = (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			const error = new Error('Falta la cabecera de autenticación');
			error.httpStatus = 401;
			throw error;
		}

		let tokenInfo;
		try {
			tokenInfo = jwt.verify(authorization, process.env.TOKEN_SECRET);
		} catch (error) {
			const err = new Error('Token no válido');
			err.httpStatus = 401;
			throw err;
		}

		if (tokenInfo.tipo !== 'usuario') {
			const error2 = new Error('El cliente no es de tipo usuario');
			error2.httpStatus = 401;
			throw error2;
		}

		// Creamos la propiedad "userAuth" en la request.
		req.userAuth = tokenInfo;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = userIsLogin;
