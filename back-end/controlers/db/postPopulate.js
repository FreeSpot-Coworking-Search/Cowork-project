const { populateDB } = require('../../helpers/resetDbHelpers');

const postPopulate = async (req, res, next) => {
	try {
		populateDB();
		res.status(200);
		res.send('Rellenando Base de Datos');
	} catch (error) {
		next(error);
	}
};

module.exports = postPopulate;
