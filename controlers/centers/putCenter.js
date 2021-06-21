const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { putCenterSchema } = require('../../schemas/centerSchema');
const { formatDateToDB } = require('../../helpers/dateHelpers');

const putCenter = async (req, res, next) => {
	try {
		const { id } = req.query;
		let updateCenter = req.body;
		if (!updateCenter) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(putCenterSchema, updateCenter);

		updateCenter = {
			...updateCenter,
			fecha_modificacion: formatDateToDB(new Date()),
		};

		await updateRegistration('centros', id, updateCenter);

		console.log('Centro modificado, Id:', id);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putCenter;
