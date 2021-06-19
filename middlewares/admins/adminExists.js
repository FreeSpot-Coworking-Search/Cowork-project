const { getRegistrations } = require('../../helpers/dbHelpers');

const adminExists = async (req, res, next) => {
	try {
		const { idAdmin } = req.query;

		if (!idAdmin) {
			const error = new Error('Falta id administrador');
			error.httpStatus = 400;
			throw error;
		}

		const objectSearch = {
			id: `${idAdmin}`,
		};
		const admin = await getRegistrations('administradores', objectSearch);

		if (admin.length === 0) {
			const error = new Error('El administrador no existe');
			error.httpStatus = 400;
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminExists;
