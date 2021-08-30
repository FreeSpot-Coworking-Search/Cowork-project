const jwt = require('jsonwebtoken');

const whoIs = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		let tokenInfo;
		console.log(authorization);

		if (authorization !== 'null') {
			tokenInfo = jwt.verify(authorization, process.env.TOKEN_SECRET);
			req.auth = tokenInfo;
		}
		next();
	} catch (error) {
		const err = new Error('Token no válido');
		err.httpStatus = 401;
		throw err;
	}
};

module.exports = whoIs;
