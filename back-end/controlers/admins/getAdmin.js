const { getRegistrations } = require('../../helpers/dbHelpers');

const getAdmin = async (req, res, next) => {
	try {
		const { id } = req.query;

		const result = await getRegistrations('administradores', {
			id: `${id}`,
		});

		console.log('Informacion requerida de administrador id:', id);
		res.status(200);
		res.send(result[0]);
	} catch (error) {
		next(error);
	}
};

module.exports = getAdmin;
