const { getRegistrations } = require('../../helpers/dbHelpers');

const getAllReserves = async (req, res, next) => {
	try {
		const tokenInfo = req.userAuth;

		const searchObject = {
			id_usuario: tokenInfo.idUser,
		};

		const reserves = await getRegistrations('reservas', searchObject);

		let result = [];
		for (const reservation of reserves) {
			const searchObject = {
				id: reservation.id_espacio,
			};
			const infoEspacio = await getRegistrations(
				'espacios',
				searchObject
			);

			result.push({
				...reservation,
				info_espacio: infoEspacio[0],
			});
		}

		res.httpStatus = 200;
		res.send(result);
	} catch (error) {
		next(error);
	}
};

module.exports = getAllReserves;
