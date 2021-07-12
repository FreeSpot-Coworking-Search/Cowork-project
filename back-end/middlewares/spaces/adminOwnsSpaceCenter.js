const { getRegistrations } = require('../../helpers/dbHelpers');

const adminOwnsSpaceCenter = async (req, res, next) => {
	try {
		const { idAuth } = req.auth;
		const { id_centro } = req.body;

		const objectSearch = {
			id: `${id_centro}`,
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

module.exports = adminOwnsSpaceCenter;
