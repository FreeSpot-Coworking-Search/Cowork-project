const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const postAdminSchema = require('../../schemas/postAdminSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');

const putAdmin = async (req, res, next) => {
	try {
		const { idAdmin } = req.query;
		let updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta Update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(postAdminSchema, updateObject);

		updateObject = {
			...updateObject,
			fecha_creacion: formatDateToDB(new Date()),
		};

		await updateRegistration('administradores', idAdmin, updateObject);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putAdmin;
