const { getRegistrations } = require('../../helpers/dbHelpers');

const getIncidences = async (req, res, next) => {
	try {
		const { id } = req.query;

		const incidences = await getRegistrations(`
		SELECT *
		FROM incidencias
		WHERE id_reserva = ${id} 
		ORDER BY fecha_incidencia DESC;
		`);

		console.log('Mostrando incidencias requeridas para reserva id:', id);
		res.httpStatus = 200;
		res.send(incidences);
	} catch (error) {
		next(error);
	}
};

module.exports = getIncidences;
