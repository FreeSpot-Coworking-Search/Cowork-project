const { getRegistrations } = require('../../helpers/dbHelpers');

const myCenter = async (req, res, next) => {
	try {
		const { id } = req.query;
		let centers = await getRegistrations(`SELECT  *
    FROM centros
    WHERE ( centros.borrado = 0 ) AND ( centros.id_administrador = ${id} ) 
    `);
		centers = await Promise.all(
			centers.map(async (center) => {
				let espacios = await getRegistrations('espacios', {
					id_centro: `${center.id}`,
				});
				espacios = await Promise.all(
					espacios.map(async (space) => {
						const incidencias =
							await getRegistrations(`SELECT incidencias.id, incidencias.descripcion, incidencias.fecha_incidencia, incidencias.categoria, incidencias.estado
                    FROM incidencias
                    INNER JOIN 	reservas ON reservas.id = incidencias.id_reserva
                    WHERE incidencias.estado = 0 AND reservas.id_espacio = ${space.id};`);

						// const spaceImages = await getRegistrations('imagenes', {
						// 	id_espacio: space.id,
						// });
						const reservas =
							await getRegistrations(`SELECT reservas.fecha_reserva, reservas.fecha_inicio, reservas.fecha_fin, reservas.pagado, usuarios.nombre, usuarios.apellidos, usuarios.nombre, usuarios.foto
                        FROM reservas
                        INNER JOIN 	usuarios ON usuarios.id = reservas.id_usuario
                        WHERE reservas.id_espacio = ${space.id};`);
						return {
							...space,
							incidencias,
							reservas,
							// imagenes: spaceImages,
						};
					})
				);
				return {
					...center,
					espacios,
				};
			})
		);

		console.log('Mostrando centro requerido, Id:', id);
		res.status(200);
		res.send({
			centros: centers,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = myCenter;
