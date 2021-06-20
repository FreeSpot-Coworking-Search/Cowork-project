const { getRegistrations } = require('../../helpers/dbHelpers');

const entityExists = async (req, res, next) => {
	try {
		const { id } = req.query;
		const route = req.originalUrl;

		let table;
		if (route.includes('users')) table = 'usuarios';
		if (route.includes('spaces')) table = 'espacios';
		if (route.includes('admins')) table = 'administradores';
		if (route.includes('centers')) table = 'centros';

		if (table === undefined) {
			//Todas las rutas ya han sido chequeadas en server.js, creo que se puede eliminar esta comprobación.
			const error = new Error('Ruta no encontrada');
			error.httpStatus = 404;
			throw error;
		}

		if (!id) {
			const error = new Error(`Falta id de ${table}`);
			error.httpStatus = 400;
			throw error;
		}

		const objectSearch = {
			id: `${id}`,
		};

		const entity = await getRegistrations(`${table}`, objectSearch);
		if (entity.length === 0) {
			const error = new Error(`El ${table} no existe`);
			error.httpStatus = 406;
			throw error;
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = entityExists;
