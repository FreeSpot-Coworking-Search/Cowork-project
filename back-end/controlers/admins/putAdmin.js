const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putAdminSchema } = require('../../schemas/adminSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');
const bcrypt = require('bcryptjs');

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

		let passwordHash;
		if (updateObject.password) {
			passwordHash = await bcrypt.hash(updateObject.password, 10);
			updateObject.password = passwordHash;
		}

		updateObject = {
			...updateObject,
			fecha_modificacion: formatDateToDB(new Date()),
		};

		await updateRegistration('administradores', id, updateObject);
		console.log('Modificación de datos de administrador id:', id);

		res.status(200);
		res.send({
			message: 'Administrador modificado',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = putAdmin;
