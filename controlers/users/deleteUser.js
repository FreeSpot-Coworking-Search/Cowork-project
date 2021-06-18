const { updateRegistration } = require('../../helpers/dbHelpers');

const deleteUser = async (req, res, next) => {
	try {
		const { idUser } = req.query;
		if (!idUser) {
			const error = new Error('Falta id usuario');
			error.httpStatus = 400;
			throw error;
		}
		await updateRegistration('usuarios', idUser, { borrado: 1 });
		res.status(200);
		res.send('Usuario eliminado');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteUser;
