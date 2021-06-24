const { insertRegistration } = require('../../helpers/dbHelpers');
const { getRegistrations } = require('../../helpers/dbHelpers');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { postReserveSchema } = require('../../schemas/reserveSchema');

const postReserve = async (req, res, next) => {
	try {
		const { idUser: id_usuario, tipo } = req.userAuth;
		let newReserve = req.body;

		if (tipo !== 'usuario') {
			const error = new Error('El cliente no es de tipo usuario');
			error.httpStatus = 400;
			throw error;
		}

		await validation(postReserveSchema, newReserve);

		const infoEspacio = await getRegistrations('espacios', {
			id: newReserve.id_espacio,
		});
		//TODO: VERIFICAR CONCORDANCIA DE FECHAS!!!
		newReserve = {
			...newReserve,
			fecha_reserva: formatDateToDB(new Date()),
			id_usuario,
			precio: infoEspacio[0].precio,
		};

		const { insertId } = await insertRegistration('reservas', newReserve);

		console.log('Nueva reserva creada, Id:', insertId);
		req.query.id = insertId;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postReserve;

/*
    precisa de objeto con las siguientes propiedades:
        fecha_inicio TIMESTAMP NOT NULL,
        fecha_fin TIMESTAMP NOT NULL,
        precio DECIMAL(6,2) NOT NULL,
        id_espacio INT UNSIGNED
*/

/* reservas.id NOT IN
                (SELECT reservas.id
                FROM reservas
                WHERE (reservas.fecha_inicio < ${searchObject['fecha_entrada']} AND reservas.fecha_fin > ${searchObject['fecha_entrada']})
                OR (reservas.fecha_inicio < ${searchObject['fecha_salida']} AND reservas.fecha_fin > ${searchObject['fecha_salida']})
                OR (${searchObject['fecha_entrada']} between reservas.fecha_inicio AND reservas.fecha_fin AND ${searchObject['fecha_salida']} between reservas.fecha_inicio AND reservas.fecha_fin)
                OR (reservas.fecha_inicio < ${searchObject['fecha_entrada']} AND reservas.fecha_fin > ${searchObject['fecha_salida']}))) */
