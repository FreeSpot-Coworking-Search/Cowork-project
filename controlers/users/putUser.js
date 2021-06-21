const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const pullUserSchema = require('../../schemas/postUserSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');

const putUser = async (req, res, next) => {
	try {
		const { idUser } = req.query;
		let updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(pullUserSchema, updateObject);

		updateObject = {
			...updateObject,
			fecha_modificacion: formatDateToDB(new Date()),
		};

		await updateRegistration('usuarios', idUser, updateObject);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putUser;
