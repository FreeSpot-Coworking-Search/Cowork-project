const { getRegistrations } = require('../../helpers/dbHelpers');

const getCenter = async (req, res, next) => {
	try {
		let owner = false;
		const { id } = req.query;
		let [info] = await getRegistrations('centros', { id: `${id}` });

		const photos = await getRegistrations('imagenes', {
			id_centro: `${id}`,
		});

		const spaces = await getRegistrations('espacios', {
			id_centro: `${id}`,
		});

		const scores =
			await getRegistrations(`SELECT  usuarios.nombre, usuarios.apellidos, usuarios.foto, reservas.id, reservas.fecha_inicio, reservas.puntuacion_usuario, reservas.comentario_usuario
		FROM reservas
		INNER JOIN espacios ON reservas.id_espacio = espacios.id 
		INNER JOIN usuarios ON reservas.id_usuario = usuarios.id WHERE ( espacios.borrado = 0 ) AND (espacios.id_centro = ${id} ) 
		`);
		const infoSpaces = await Promise.all(
			spaces.map(async (space) => {
				if (
					req.auth &&
					req.auth.tipo === 'administrador' &&
					info.id_administrador === req.auth.idAuth
				) {
					owner = true;
					const incidencias =
						await getRegistrations(`SELECT incidencias.id, incidencias.descripcion, incidencias.fecha_incidencia, incidencias.categoria
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

		const centro = {
			owner,
			info: { ...info, imagenes: photos },
			valoraciones: scores,
			espacios: infoSpaces,
		};

		console.log('Mostrando centro requerido, Id:', id);
		res.status(200);
		res.send({
			center: centro,
		});
	} catch (error) {
		next(error);
	}
};
module.exports = getCenter;
