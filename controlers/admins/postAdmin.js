const postAdmin = async (rec, res) => {
	try {
		res.status(200);
		res.send({
			path: rec.path,
			message: 'controlador postAdmin',
		});
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = postAdmin;
