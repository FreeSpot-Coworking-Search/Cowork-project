const { getRegistrations, getConnection } = require('../../helpers/dbHelpers');

const getSpace = async (req, res, next) => {
	try {
		const { id } = req.query;

		const results = await getRegistrations('espacios', { id: `${id}` });

		const services = await getRegistrations(
			`SELECT servicios.nombre, servicios.id FROM servicios INNER JOIN
			 espacios_servicios ON servicios.id = espacios_servicios.id_servicio
			 AND espacios_servicios.id_espacio = ${id} AND espacios_servicios.precio IS NULL;`
		);
		const extraServices = await getRegistrations(
			`SELECT servicios.nombre, servicios.id, espacios_servicios.precio FROM servicios INNER JOIN
			 espacios_servicios ON servicios.id = espacios_servicios.id_servicio
			 AND espacios_servicios.id_espacio = ${id} AND espacios_servicios.precio IS NOT NULL;`
		);
		const incidencias = await getRegistrations(`SELECT incidencias.*
		FROM incidencias
		INNER JOIN 	reservas ON reservas.id = incidencias.id_reserva
		WHERE reservas.id_espacio = ${id};`);

		const photos = await getRegistrations('imagenes', {
			id_espacio: `${id}`,
		});

		results[0] = {
			...results[0],
			servicios: services,
			servicios_estra: extraServices,
			imagenes: photos,
			incidencias,
		};
		console.log('Mostadro espacio requerido, Id:', id);
		res.status(200);
		res.send({
			status: 'ok',
			data: results[0],
		});
	} catch (error) {
		next(error);
	}
};

module.exports = getSpace;
