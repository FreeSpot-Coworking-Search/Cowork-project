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

		const services = await getRegistrations(
			`SELECT servicios.nombre, servicios.id 
				FROM servicios 
				INNER JOIN espacios_servicios ON servicios.id = espacios_servicios.id_servicio
				AND espacios_servicios.id_espacio = ${id} AND espacios_servicios.precio IS NULL;`
		);

		const extraServices = await getRegistrations(
			`SELECT servicios.nombre, servicios.id, espacios_servicios.precio 
				FROM servicios 
				INNER JOIN espacios_servicios ON servicios.id = espacios_servicios.id_servicio
				AND espacios_servicios.id_espacio = ${id} AND espacios_servicios.precio IS NOT NULL;`
		);

		const allServices = await getRegistrations('SELECT * FROM servicios;');

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
					fecha_inicio: reserva.fecha_reserva,
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
			const incidencias = await getRegistrations(`SELECT incidencias.*
						FROM incidencias
						INNER JOIN 	reservas ON reservas.id = incidencias.id_reserva
						WHERE reservas.id_espacio = ${id};`);
			results = {
				...results,
				centro: centro,
				servicios: services,
				servicios_extra: extraServices,
				listado_servicios: allServices,
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
