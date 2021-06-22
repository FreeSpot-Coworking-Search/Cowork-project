const { insertRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { postSpaceSchema } = require('../../schemas/spaceSchema');

const postSpace = async (req, res, next) => {
	try {
		const newSpace = req.body;
		await validation(postSpaceSchema, newSpace);

		const { insertId } = await insertRegistration('espacios', newSpace);

		req.query.id = insertId;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postSpace;
