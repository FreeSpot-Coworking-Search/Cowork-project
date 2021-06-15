const { updateRegistration } = require('../../helpers/dbHelpers');

const deleteSpace = async (req, res, next) => {
	try {
		const { id } = req.query;
		if (!id) {
			const error = new Error('Falta id del espacio');
			error.httpStatus = 400;
			throw error;
		}
		await updateRegistration('espacios', id, { borrado: 1 });
		res.status(200);
		res.send('Espacio eliminado');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteSpace;
