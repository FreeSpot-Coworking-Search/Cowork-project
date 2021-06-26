const adminIsLogged2 = (req, res, next) => {
	try {
		if (!req.auth) {
			const error = new Error('Falta la cabecera de autenticación');
			error.httpStatus = 401;
			throw error;
		} else if (req.auth.tipo !== 'administrador') {
			const error = new Error('El usuario no es administrador');
			error.httpStatus = 401;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminIsLogged2;
