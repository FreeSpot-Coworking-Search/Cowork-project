const {
	updateRegistration,
	deleteRegistrations,
} = require('../../helpers/dbHelpers');

const deleteSpace = async (req, res, next) => {
	try {
		const { id } = req.query;
		await deleteRegistrations('espacios_servicios', {
			id_espacio: `${id}`,
		});
		await updateRegistration('espacios', id, { borrado: 1 });
		res.status(200);
		res.send('Espacio eliminado');
	} catch (error) {
		next(error);
	}
};

module.exports = deleteSpace;
