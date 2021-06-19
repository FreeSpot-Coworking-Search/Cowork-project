const { updateRegistration } = require('../../helpers/dbHelpers');

const deleteAdmin = async (req, res, next) => {
	try {
		const { idAdmin } = req.query;

		await updateRegistration('administradores', idAdmin, {
			borrado: 1,
		});
		res.status(200);
		res.send('Usuario eliminado');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteAdmin;
