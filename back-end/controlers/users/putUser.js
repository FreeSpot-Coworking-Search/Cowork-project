const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { pullUserSchema } = require('../../schemas/userSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const bcrypt = require('bcryptjs');

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

		const { password } = updateObject;
		let passwordHash;
		if (password === undefined) {
			passwordHash = password;
		} else {
			passwordHash = await bcrypt.hash(password, 10);
			delete updateObject.password;
		}

		updateObject = {
			...updateObject,
			fecha_modificacion: formatDateToDB(new Date()),
			password: passwordHash,
		};

		await updateRegistration('usuarios', idUser, updateObject);
		console.log('Modificación de datos de usuario id:', idUser);

		res.status(200);
		res.send({
			message: 'Usuario modificado',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = putUser;
