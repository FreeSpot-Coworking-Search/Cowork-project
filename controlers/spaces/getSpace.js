const { getRegistrations, getConnection } = require('../../helpers/dbHelpers');

const getSpace = async (req, res, next) => {
	try {
		const { id } = req.query;

		const results = await getRegistrations('espacios', { id: `${id}` });

		const services = await getRegistrations(
			`SELECT servicios.nombre, servicios.id FROM servicios INNER JOIN
			 espacios_servicios ON servicios.id = espacios_servicios.id_servicio
			 AND espacios_servicios.id_espacio = ${id};`
		);
		const photos = await getRegistrations('imagenes', {
			id_espacio: `${id}`,
		});

		results[0] = {
			...results[0],
			servicios: services,
			imagenes: photos,
		};

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
