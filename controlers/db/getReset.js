const { resetDB } = require('../../helpers/initDbHelpers');

const deleteUser = async (req, res, next) => {
	try {
		resetDB();
		res.status(200);
		res.send('Reseteando Base de Datos');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteUser;
