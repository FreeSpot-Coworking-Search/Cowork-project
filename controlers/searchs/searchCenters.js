const { getSearchCenters } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { searchCentersSchema } = require('../../schemas/searchSchema');

const searchCenters = async (req, res, next) => {
	try {
		const searchObject = req.body;
		await validation(searchCentersSchema, searchObject);
		const result = await getSearchCenters(searchObject);

		res.status(200);
		res.send({
			status: 'ok',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = searchCenters;
