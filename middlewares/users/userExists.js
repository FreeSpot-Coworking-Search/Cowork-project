const { getRegistrations } = require('../../helpers/dbHelpers');

const userExists = async (req, res, next) => {
	try {
		const { id } = req.query;
		const objectSearch = {
			id: `${id}`,
		};
		if (!id) {
			const error = new Error('Falta id usuario');
			error.httpStatus = 400;
			throw error;
		}
		const user = await getRegistrations('usuarios', objectSearch);
		if (user.length === 0) {
			const error = new Error('El usuario no existe');
			error.httpStatus = 400;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = userExists;
