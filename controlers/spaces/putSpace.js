const { updateRegistration } = require('../../helpers/dbHelpers');

const putSpace = async (req, res, next) => {
	try {
		const { id } = req.query;
		const updateObject = req.body;
		if (!id) {
			const error = new Error('Falta id del espacio');
			error.httpStatus = 400;
			throw error;
		}
		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}
		await updateRegistration('espacios', id, updateObject);
		console.log('hola');
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putSpace;
