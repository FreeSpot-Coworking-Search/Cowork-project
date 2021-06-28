const { getRegistrations } = require('../../helpers/dbHelpers');

const adminOwnsCenter = async (req, res, next) => {
	try {
		const { idAuth } = req.auth;
		const { id } = req.query;

		const objectSearch = {
			id: `${id}`,
			id_administrador: `${idAuth}`,
		};

		const result = await getRegistrations('centros', objectSearch);

		if (result.length === 0) {
			const error = new Error(
				'Administrador no autorizado para modificar centro'
			);
			error.httpStatus = 401;
			throw error;
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminOwnsCenter;
