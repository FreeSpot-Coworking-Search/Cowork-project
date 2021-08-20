const {
	getSearchCenters,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { searchCentersSchema } = require('../../schemas/searchSchema');

const searchCenters = async (req, res, next) => {
	try {
		const searchObject = req.query;
		await validation(searchCentersSchema, searchObject);
		let results = await getSearchCenters(searchObject);

		results = await Promise.all(
			results.map(async (center) => {
				const images = await getRegistrations('imagenes', {
					id_centro: center.id,
				});
				const newCenter = { ...center, imagenes: images };
				return newCenter;
			})
		);
		const services = await getRegistrations('SELECT * FROM servicios;');

		res.status(200);
		res.send({
			results,
			services,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = searchCenters;
