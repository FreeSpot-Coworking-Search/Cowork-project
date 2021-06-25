const { getRegistrations } = require('../../helpers/dbHelpers');

const getUserIncidences = async (req, res, next) => {
	try {
		const { idUser: id_usuario } = req.userAuth;

		const incidences = await getRegistrations(`
            SELECT I.id, I.fecha_incidencia, I.categoria, I.estado, I.id_reserva, R.id_espacio, E.tipo
            FROM incidencias I
            JOIN reservas R ON R.id = I.id_reserva
            JOIN espacios E ON E.id = R.id_espacio
            WHERE id_reserva IN (SELECT id
            FROM reservas
            WHERE id_usuario = ${id_usuario})
            ORDER BY I.fecha_incidencia DESC;
            `);

		res.httpStatus = 200;
		res.send(incidences);
	} catch (error) {
		next(error);
	}
};

module.exports = getUserIncidences;
