const { getRegistrations } = require('../../helpers/dbHelpers');

const getSpace = async (req, res, next) => {
	try {
		const { id } = req.query;

		let [results] = await getRegistrations('espacios', { id: `${id}` });
		const [centro] = await getRegistrations('centros', {
			id: results.id_centro,
		});
		let reserves = await getRegistrations('reservas', {
			id_espacio: `${id}`,
		});

		const includedServices = await getRegistrations(
			`SELECT S.id, S.nombre, ES.id_espacio, ES.precio
			FROM servicios S
			LEFT JOIN espacios_servicios ES
			ON S.id = ES.id_servicio
			WHERE ES.id_espacio = ${id};`
		);

		const services = includedServices.filter(
			(service) => service.precio === null
		);
		const extraServices = includedServices.filter(
			(service) => service.precio !== null
		);

		const photos = await getRegistrations('imagenes', {
			id_espacio: `${id}`,
		});
		if (
			!req.auth ||
			req.auth.tipo !== 'administrador' ||
			centro.id_administrador !== req.auth.idAuth
		) {
			reserves = reserves.map((reserva) => {
				return {
					fecha_inicio: reserva.fecha_inicio,
					fecha_fin: reserva.fecha_fin,
				};
			});
			results = {
				...results,
				centro: centro,
				servicios: services,
				servicios_extra: extraServices,
				imagenes: photos,
				reserves,
				owner: false,
			};
		} else {
			const allServices = await getRegistrations(
				'SELECT * FROM servicios;'
			);

			const mergedServices = [];
			allServices.forEach((service) => {
				const finded = includedServices.find(
					(includedService) => includedService.id === service.id
				);

				if (finded !== undefined) {
					mergedServices.push({
						...service,
						precio: finded.precio,
						included: true,
					});
				} else {
					mergedServices.push({
						...service,
						precio: null,
						included: false,
					});
				}
			});

			const incidencias = await getRegistrations(`SELECT incidencias.*
						FROM incidencias
						INNER JOIN 	reservas ON reservas.id = incidencias.id_reserva
						WHERE reservas.id_espacio = ${id};`);
			results = {
				...results,
				centro: centro,
				servicios: services,
				servicios_extra: extraServices,
				listado_servicios: mergedServices,
				imagenes: photos,
				reserves,
				incidencias,
				owner: true,
			};
		}

		console.log('Mostandro espacio requerido, Id:', id);
		res.status(200);
		res.send({
			space: results,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = getSpace;
