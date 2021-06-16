const { updateRegistration } = require('../../helpers/dbHelpers');

const putUser = async (req, res, next) => {
	try {
		const { id } = req.query;
		const updateObject = req.body;
		if (!id) {
			const error = new Error('Falta id usuario');
			error.httpStatus = 400;
			throw error;
		}
		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}
		console.log('hola');
		await updateRegistration('usuarios', id, updateObject);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putUser;
