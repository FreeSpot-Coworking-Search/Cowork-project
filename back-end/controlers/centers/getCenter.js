const { getRegistrations } = require('../../helpers/dbHelpers');

const getCenter = async (req, res, next) => {
	try {
		const { id } = req.query;
		let [centro] = await getRegistrations('centros', { id: `${id}` });

		const photos = await getRegistrations('imagenes', {
			id_centro: `${id}`,
		});

		const spaces = await getRegistrations('espacios', {
			id_centro: `${id}`,
		});
		const infoSpaces = await Promise.all(
			spaces.map(async (space) => {
				if (
					!req.auth ||
					req.auth.tipo !== 'administrador' ||
					centro.id_administrador !== req.auth.idAuth
				) {
					return {
						id: space.id,
						tipo: space.tipo,
						estado: space.estado,
					};
				} else {
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
				}
			})
		);

		centro = {
			...centro,
			imagenes: photos,
			espacios: infoSpaces,
		};

		console.log('Mostrando centro requerido, Id:', id);
		res.status(200);
		res.send({
			status: 'ok',
			data: centro,
		});
	} catch (error) {
		next(error);
	}
};
module.exports = getCenter;
