const { getSearchCenters } = require('../../helpers/dbHelpers');

const searchCenters = async (req, res, next) => {
	try {
		const searchObject = req.body;
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
