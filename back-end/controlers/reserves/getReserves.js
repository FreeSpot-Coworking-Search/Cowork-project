const { getRegistrations } = require('../../helpers/dbHelpers');

const getReservation = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { idUser: id_usuario } = req.userAuth;
		const url = req.originalUrl;

		let searchObject = {};
		if (url.includes('allreserves')) {
			searchObject = {
				id_usuario,
			};
		} else {
			searchObject = {
				id,
			};
		}

		const reserves = await getRegistrations('reservas', searchObject);

		let result = [];
		for (const reservation of reserves) {
			const searchObject = {
				id: reservation.id_espacio,
			};
			const infoEspacio = await getRegistrations(
				'espacios',
				searchObject
			);
			const infoServices = await getRegistrations(
				`SELECT reservas_servicios.*, servicios.nombre 
				FROM reservas_servicios 
				INNER JOIN servicios ON reservas_servicios.id_servicio = servicios.id 
				WHERE reservas_servicios.id_reserva = ${id} AND reservas_servicios.precio IS null;`
			);
			const infoExtraServices = await getRegistrations(
				`SELECT reservas_servicios.*, servicios.nombre 
				FROM reservas_servicios 
				INNER JOIN servicios ON reservas_servicios.id_servicio = servicios.id 
				WHERE reservas_servicios.id_reserva = ${id} AND reservas_servicios.precio IS NOT null;`
			);

			result.push({
				...reservation,
				info_espacio: infoEspacio[0],
				servicios: infoServices,
				servicios_extra: infoExtraServices,
			});
		}

		console.log('Mostrando reservas requeridas:', searchObject);
		res.httpStatus = 200;
		res.send(result);
	} catch (error) {
		next(error);
	}
};

module.exports = getReservation;
