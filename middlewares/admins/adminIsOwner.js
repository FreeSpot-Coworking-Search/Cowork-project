const adminIsOwner = async (req, res, next) => {
	try {
		const { idAuth, tipo } = req.adminAuth;
		const { id } = req.query;

		if (tipo !== 'administrador') {
			const error = new Error('El usuario no es de tipo administrador');
			error.httpStatus = 400;
			throw error;
		}

		if (Number(id) !== Number(idAuth)) {
			const error = new Error('Administrador no autorizado');
			error.httpStatus = 400;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminIsOwner;
