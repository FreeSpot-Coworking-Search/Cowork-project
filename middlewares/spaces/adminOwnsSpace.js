const { getRegistrations } = require('../../helpers/dbHelpers');

const adminOwnsSpace = async (req, res, next) => {
	try {
		const { idAuth, tipo } = req.adminAuth;
		const { id } = req.query;

		if (tipo !== 'administrador') {
			const error = new Error('El usuario no es de tipo administrador');
			error.httpStatus = 400;
			throw error;
		}

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
