const adminIsOwner = async (req, res, next) => {
	try {
		const { idAuth } = req.adminAuth;
		const { idAdmin } = req.query;
		if (Number(idAdmin) !== Number(idAuth)) {
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
