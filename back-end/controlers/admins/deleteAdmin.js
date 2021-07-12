const { updateRegistration } = require('../../helpers/dbHelpers');

const deleteAdmin = async (req, res, next) => {
	try {
		const { id } = req.query;

		await updateRegistration('administradores', id, {
			borrado: 1,
		});
		res.status(200);
		res.send('Administrador eliminado, id', id);
	} catch (error) {
		next(error);
	}
};

module.exports = deleteAdmin;
