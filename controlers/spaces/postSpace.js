const { insertRegistration } = require('../../helpers/dbHelpers');

const postSpace = async (req, res, next) => {
	try {
		const newSpace = req.body;
		const { insertId } = await insertRegistration('espacios', newSpace);
		req.query.id = insertId;
		console.log('aqui llego');
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postSpace;
