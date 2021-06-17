const getAdmin = async (rec, res) => {
	try {
		res.status(200);
		res.send({
			path: rec.path,
			message: 'controlador getAdmin',
		});
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = getAdmin;
