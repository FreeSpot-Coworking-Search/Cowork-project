const { getRegistrations } = require('../../helpers/dbHelpers');

const userOwnsReserve = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idUser: id_usuario } = req.userAuth;

		const searchObject = {
			id,
			id_usuario,
		};

		const result = await getRegistrations('reservas', searchObject);

		if (result.length === 0) {
			const error = new Error(
				'Usuario no autorizado para solicitar reserva.'
			);
			error.httpStatus = 401;
			throw error;
		}
		const infoReserve = {
			fecha_reserva: result[0].fecha_reserva,
			fecha_inicio: result[0].fecha_inicio, // comprobar si sirve
			fecha_fin: result[0].fecha_fin,
			id_espacio: result[0].id_espacio, //comprobar si sirve
			puntuacion_usuario: result[0].puntuacion_usuario,
		};

		req.infoReserve = infoReserve;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = userOwnsReserve;
