const userIsOwner = async (req, res, next) => {
	try {
		const { idUser } = req.userAuth;
		const { id } = req.query;
		if (Number(id) !== Number(idUser)) {
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
