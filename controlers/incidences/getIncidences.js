const { getRegistrations } = require('../../helpers/dbHelpers');

const getIncidences = async (req, res, next) => {
	try {
		const { id } = req.query;

		const searchObject = {
			id_reserva: id,
		};

		const incidences = await getRegistrations('incidencias', searchObject);

		console.log('Mostrando incidencias requeridas para reserva id:', id);
		res.httpStatus = 200;
		res.send(incidences);
	} catch (error) {
		next(error);
	}
};

module.exports = getIncidences;
