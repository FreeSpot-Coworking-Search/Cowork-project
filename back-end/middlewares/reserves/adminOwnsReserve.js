const { getRegistrations } = require('../../helpers/dbHelpers');

const adminOwnsReserve = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idAuth: id_administrador } = req.auth;

		if (!id) {
			const error = new Error('Falta id incidencia');
			error.httpStatus = 400;
			throw error;
		}

		const result = await getRegistrations('incidencias', { id });

		if (result.length === 0) {
			const error = new Error('La incidencia no existe');
			error.httpStatus = 404;
			throw error;
		}

		const match = await getRegistrations(`
		SELECT I.estado, I.id_reserva
		FROM incidencias I
		JOIN reservas R ON R.id = I.id_reserva
		JOIN espacios E ON E.id = R.id_espacio
		JOIN centros C ON C.id = E.id_centro
		WHERE I.id = ${id} AND C.id_administrador = ${id_administrador};`);

		if (match.length === 0) {
			const error = new Error(
				'Administrador no autorizado para modificar incidencia.'
			);
			error.httpStatus = 401;
			throw error;
		}

		const infoReserve = {
			estado: match[0].estado,
			id_reserva: match[0].id_reserva,
		};

		req.infoReserve = infoReserve;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = adminOwnsReserve;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEF1dGgiOjksInJvbGwiOiJub3JtYWwiLCJ0aXBvIjoiYWRtaW5pc3RyYWRvciIsImlhdCI6MTYyNDY0OTE3NiwiZXhwIjoxNjI1MjUzOTc2fQ.oTfOAx4P08b5Fgzo7QpMmLWBGn27EKMvM5E6FKp_iVc
