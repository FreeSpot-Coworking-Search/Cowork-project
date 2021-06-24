const { getRegistrations } = require('../../helpers/dbHelpers');

const getCenter = async (req, res, next) => {
	try {
		const { id } = req.query;
		const result = await getRegistrations('centros', { id: `${id}` });

		const photos = await getRegistrations('imagenes', {
			id_centro: `${id}`,
		});

		const spaces = await getRegistrations('espacios', {
			id_centro: `${id}`,
		});
		const infoSpaces = await Promise.all(
			spaces.map(async (space) => {
				const incidencias =
					await getRegistrations(`SELECT incidencias.id, incidencias.fecha_incidencia, incidencias.categoria
		   FROM incidencias
		   INNER JOIN 	reservas ON reservas.id = incidencias.id_reserva
		   WHERE incidencias.estado = 1 AND reservas.id_espacio = ${space.id};`);
				return {
					id: space.id,
					tipo: space.tipo,
					estado: space.estado,
					incidencias,
				};
			})
		);

		result[0] = {
			...result[0],
			imagenes: photos,
			espacios: infoSpaces,
		};

		console.log('Mostrando centro requerido, Id:', id);
		res.status(200);
		res.send({
			status: 'ok',
			data: result[0],
		});
	} catch (error) {
		next(error);
	}
};

module.exports = getCenter;
