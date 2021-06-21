const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putAdminSchema } = require('../../schemas/adminSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');

const putAdmin = async (req, res, next) => {
	try {
		const { id } = req.query;
		let updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta Update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putAdminSchema, updateObject);

		updateObject = {
			...updateObject,
			fecha_fechamodificacion: formatDateToDB(new Date()),
		};

		await updateRegistration('administradores', id, updateObject);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putAdmin;
