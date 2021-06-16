const { insertRegistration } = require('../../helpers/dbHelpers');

const postUser = async (req, res, next) => {
	try {
		const newUser = req.body;
		const { insertId } = await insertRegistration('usuarios', newUser);
		req.query.id = insertId;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postUser;
