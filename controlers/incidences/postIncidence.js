const { insertRegistration } = require('../../helpers/dbHelpers');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { postIncidenceSchema } = require('../../schemas/incidenceSchema');
const { isWithinInterval } = require('date-fns');

const postIncidence = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { fecha_inicio, fecha_fin } = req.infoReserve;
		let newIncidence = req.body;

		await validation(postIncidenceSchema, newIncidence);

		const now = formatDateToDB(new Date());
		const isWithin = isWithinInterval(new Date(), {
			start: fecha_inicio,
			end: fecha_fin,
		});

		if (isWithin !== true) {
			const error = new Error(
				'Para informar incidencias se debe estar dentro de las fechas de reserva.'
			);
			error.httpStatus = 403;
			throw error;
		}

		newIncidence = {
			...newIncidence,
			fecha_incidencia: now,
			estado: 0,
			id_reserva: id,
		};

		const { insertId } = await insertRegistration(
			'incidencias',
			newIncidence
		);

		console.log(
			'Nueva incidencia creada en reserva id:',
			id,
			'id de incidencia:',
			insertId
		);
		req.query.id = id;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postIncidence;
