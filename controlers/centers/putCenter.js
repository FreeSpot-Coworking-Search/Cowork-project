const { updateRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const postCenterSchema = require('../../schemas/postCenterSchema');

const putCenter = async (req, res, next) => {
	try {
		const { id } = req.query;
		const updateCenter = req.body;

		if (!updateCenter) {
			const error = new Error('Falta update');
			error.httpStatus = 400;
			throw error;
		}

		await validation(postCenterSchema, updateCenter);

		await updateRegistration('centros', updateCenter);

		console.log('Centro modificado, Id:', id);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = putCenter;
