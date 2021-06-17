const logAdmin = async (rec, res) => {
	try {
		res.status(200);
		res.send({
			path: rec.path,
			message: 'controlador logAdmin',
		});
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = logAdmin;
