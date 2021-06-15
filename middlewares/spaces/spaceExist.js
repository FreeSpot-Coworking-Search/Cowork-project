const { getRegistrations } = require('../../helpers/dbHelpers');

const spaceExists = async (req, res, next) => {
	try {
		const { id } = req.query;
		const objectSearch = {
			id: `${id}`,
		};
		if (!id) {
			const error = new Error('Falta id del espacio');
			error.httpStatus = 400;
			throw error;
		}
		const user = await getRegistrations(objectSearch);
		if (user.length === 0) {
			const error = new Error('El espacio no existe');
			error.httpStatus = 400;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = spaceExists;
