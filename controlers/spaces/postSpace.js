const { insertRegistration } = require('../../helpers/dbHelpers');

const postSpace = async (req, res, next) => {
	try {
		const newSpace = req.body;
		await insertRegistration('espacios', newSpace);
		res.status(200);
		res.send(newSpace);
	} catch (error) {
		next(error);
	}
};

module.exports = postSpace;
