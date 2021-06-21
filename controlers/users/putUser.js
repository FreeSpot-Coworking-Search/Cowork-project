const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const postUserSchema = require('../../schemas/postUserSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');

const putUser = async (req, res, next) => {
	try {
		const { idUser } = req.query;
		let updateObject = req.body;
		if (!idUser) {
			const error = new Error('Falta id usuario');
			error.httpStatus = 400;
			throw error;
		}
		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(postUserSchema, updateObject);

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
