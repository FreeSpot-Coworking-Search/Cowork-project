const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putUserSchema } = require('../../schemas/userSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const bcrypt = require('bcryptjs');

const putUser = async (req, res, next) => {
	try {
		const { id } = req.query;
		let updateObject = req.body;

		if (!updateObject) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putUserSchema, updateObject);

		let passwordHash;
		if (updateObject.password) {
			passwordHash = await bcrypt.hash(updateObject.password, 10);
			updateObject.password = passwordHash;
		}

		updateObject = {
			...updateObject,
			fecha_modificacion: formatDateToDB(new Date()),
		};

		await updateRegistration('usuarios', id, updateObject);
		console.log('Modificación de datos de usuario id:', id);

		res.status(200);
		res.send({
			message: 'Usuario modificado',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = putUser;
