const { getRegistrations } = require('../../helpers/dbHelpers');

const getUser = async (req, res, next) => {
	try {
		const { idUser } = req.query;
		const { correo } = req.body;
		let objectSearch;
		if (idUser) {
			objectSearch = {
				id: `${idUser}`,
			};
		} else {
			objectSearch = {
				correo: `${correo}`,
			};
		}
		const results = await getRegistrations('usuarios', objectSearch);
		if (results.length === 0) {
			const error = new Error('El usuario no existe');
			error.httpStatus = 401;
			throw error;
		}
		res.status(200);
		res.send({
			status: 'ok',
			data: results[0],
		});
	} catch (error) {
		next(error);
	}
};

module.exports = getUser;
