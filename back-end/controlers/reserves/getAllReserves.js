const { getRegistrations } = require('../../helpers/dbHelpers');

const getReservation = async (req, res, next) => {
	try {
		const { idUser } = req.userAuth;

		const reserves = await getRegistrations(
			`SELECT R.*, E.nombre, C.direccion, C.telefono
			FROM reservas R
			JOIN espacios E ON R.id_espacio = E.id
			JOIN centros C ON E.id_centro = C.id
			WHERE id_usuario = ${idUser};`
		);

		let result = [];
		for (const reservation of reserves) {
			const services = await getRegistrations(`
				SELECT S.*, RS.precio, RS.id_reserva
				FROM servicios S 
				JOIN reservas_servicios RS ON S.id = RS.id_servicio
				WHERE RS.id_reserva = ${reservation.id};
			`);

			const incidences = await getRegistrations('incidencias', {
				id_reserva: reservation.id,
			});

			result.push({
				...reservation,
				servicios: services,
				incidencias: incidences,
			});
		}

		console.log('Enviando información de reservas, Id usuario:', idUser);
		res.httpStatus = 200;
		res.send(result);
	} catch (error) {
		next(error);
	}
};

module.exports = getReservation;
