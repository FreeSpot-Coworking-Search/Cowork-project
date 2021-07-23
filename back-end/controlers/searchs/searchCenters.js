const {
	getSearchCenters,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { searchCentersSchema } = require('../../schemas/searchSchema');

const searchCenters = async (req, res, next) => {
	try {
		const searchObject = req.body;
		await validation(searchCentersSchema, searchObject);
		let result = await getSearchCenters(searchObject);

		result = await Promise.all(
			result.map(async (center) => {
				const images = await getRegistrations('imagenes', {
					id_centro: center.id,
				});
				const newCenter = { ...center, imagenes: images };
				return newCenter;
			})
		);

		console.log(searchObject);
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
