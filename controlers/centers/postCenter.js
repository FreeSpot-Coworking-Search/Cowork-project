const { insertRegistration } = require('../../helpers/dbHelpers');
const { validation } = require('../../helpers/schemaHelpers');
const { postCenterSchema } = require('../../schemas/centerSchema');

const postCenter = async (req, res, next) => {
	try {
		const { idAuth } = req.adminAuth;
		let newCenter = req.body;

		await validation(postCenterSchema, newCenter);

		newCenter = {
			...newCenter,
			id_administrador: idAuth,
		};

		const { insertId } = await insertRegistration('centros', newCenter);

		console.log('Nuevo centro creado, Id:', insertId);
		req.query.id = insertId;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = postCenter;
