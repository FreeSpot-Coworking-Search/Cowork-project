const { updateRegistration } = require('../../helpers/dbHelpers');

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.query;

		await updateRegistration('centros', id, {
			borrado: 1,
		});

		console.log('Centro eliminado, id:', id);
		res.status(200);
		res.send('Centro eliminado');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteUser;
