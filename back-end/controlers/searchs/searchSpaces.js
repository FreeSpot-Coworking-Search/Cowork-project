const {
	getSearchSpaces,
	getRegistrations,
} = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { searchSpacesSchema } = require('../../schemas/searchSchema');

const searchSpaces = async (req, res, next) => {
	try {
		const searchObject = req.query;
		await validation(searchSpacesSchema, searchObject);
		let results = await getSearchSpaces(searchObject);

		results = await Promise.all(
			results.map(async (space) => {
				const spaceImages = await getRegistrations('imagenes', {
					id_espacio: space.id,
				});
				const newSpace = { ...space, imagenes: spaceImages };
				return newSpace;
			})
		);

		res.status(200);
		res.send({
			results,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = searchSpaces;
