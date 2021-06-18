const userIsOwner = async (req, res, next) => {
	try {
		const { idUser: idAuth } = req.userAuth;
		const { idUser } = req.query;
		if (Number(idUser) !== Number(idAuth)) {
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
