const { getRegistrations } = require('../../helpers/dbHelpers');

const getSpace = async (req, res, next) => {
	try {
		const { id } = req.query;
		const objectSearch = {
			id: `${id}`,
		};
		const space = await getRegistrations('espacios', objectSearch);
		if (space.length === 0) {
			const error = new Error('El espacio no existe');
			error.httpStatus = 401;
			throw error;
		}
		res.status(200);
		res.send(space[0]);
	} catch (error) {
		next(error);
	}
};

module.exports = getSpace;
