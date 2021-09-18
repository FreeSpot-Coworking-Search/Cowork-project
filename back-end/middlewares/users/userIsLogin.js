const jwt = require('jsonwebtoken');

const userIsLogin = (req, res, next) => {
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
			const err = new Error(
				'Debes loguearte para poder realizar esta acción'
			);
			err.httpStatus = 401;
			throw err;
		}

		if (tokenInfo.tipo !== 'usuario') {
			const error2 = new Error('El cliente no es de tipo usuario');
			error2.httpStatus = 401;
			throw error2;
		}

		req.userAuth = tokenInfo;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = userIsLogin;
