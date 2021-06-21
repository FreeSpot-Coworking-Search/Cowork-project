const { updateRegistration } = require('../../helpers/dbHelpers');

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.query;

		await updateRegistration('usuarios', id, { borrado: 1 });
		res.status(200);
		res.send('Usuario eliminado');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteUser;
