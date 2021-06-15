const { insertRegistration } = require('../../helpers/dbHelpers');

const postUser = async (req, res, next) => {
	try {
		const newUser = req.body;
		await insertRegistration('usuarios', newUser);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postUser;
