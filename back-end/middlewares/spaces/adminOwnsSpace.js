const { getRegistrations } = require('../../helpers/dbHelpers');

const adminOwnsSpace = async (req, res, next) => {
	try {
		const { idAuth } = req.auth;
		const { id } = req.query;

		const result =
			await getRegistrations(`SELECT espacios.id FROM espacios INNER JOIN centros ON centros.id = espacios.id_centro
        WHERE espacios.id = ${id} AND centros.id_administrador = ${idAuth};`);

		if (result.length === 0) {
			const error = new Error(
				'Administrador no autorizado para modificar el espacio'
			);
			error.httpStatus = 401;
			throw error;
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminOwnsSpace;
