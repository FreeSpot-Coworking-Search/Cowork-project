const Joi = require('joi');

const pullUserSchema = Joi.object().keys({
	correo: Joi.string().required().email(),
	password: Joi.string().required().min(8).max(100),
});

module.exports = pullUserSchema;
