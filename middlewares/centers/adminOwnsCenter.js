const { getRegistrations } = require('../../helpers/dbHelpers');

const adminOwnsCenter = async (req, res, next) => {
	try {
		const { idAuth, tipo } = req.auth;
		const { id } = req.query;

		if (tipo !== 'administrador') {
			const error = new Error('El usuario no es de tipo administrador');
			error.httpStatus = 400;
			throw error;
		}

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
