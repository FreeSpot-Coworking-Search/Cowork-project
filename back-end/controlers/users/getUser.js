const { getRegistrations } = require('../../helpers/dbHelpers');

const getUser = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { correo } = req.body;
		let objectSearch;
		if (id) {
			objectSearch = {
				id: `${id}`,
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
