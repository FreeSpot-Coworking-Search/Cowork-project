const userIsOwner = async (req, res, next) => {
	try {
		const { idUser: idAuth, tipo } = req.userAuth;
		const { id } = req.query;

		if (tipo !== 'usuario') {
			const error = new Error('El usuario no es de tipo usuario');
			error.httpStatus = 400;
			throw error;
		}

		if (Number(id) !== Number(idAuth)) {
			const error = new Error('Usuario no autorizado');
			error.httpStatus = 400;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = userIsOwner;
