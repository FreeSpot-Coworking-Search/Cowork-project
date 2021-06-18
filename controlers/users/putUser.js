const { updateRegistration } = require('../../helpers/dbHelpers');

const putUser = async (req, res, next) => {
	try {
		const { idUser } = req.query;
		const updateObject = req.body;
		if (!idUser) {
			const error = new Error('Falta id usuario');
			error.httpStatus = 400;
			throw error;
		}
		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await updateRegistration('usuarios', idUser, updateObject);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putUser;
