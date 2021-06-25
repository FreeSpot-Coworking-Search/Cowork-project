const { getRegistrations } = require('../../helpers/dbHelpers');

const entityExists = async (req, res, next) => {
	try {
		const { id } = req.query;
		const url = req.originalUrl;

		const route = url.slice(url.indexOf('/', 1) + 1, url.indexOf('/', 5));
		const options = {
			users: 'usuarios',
			spaces: 'espacios',
			admins: 'administradores',
			centers: 'centros',
			reserves: 'reservas',
			incidences: 'reservas',
		};
		const table = options[`${route}`];

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
			const error = new Error(`${table} no existe`);
			error.httpStatus = 406;
			throw error;
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = entityExists;
