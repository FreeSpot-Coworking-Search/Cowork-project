const Joi = require('joi');

const pullUserSchema = Joi.object().keys({
	correo: Joi.string().email(),
	password: Joi.string().min(8).max(100),
	nombre_usuario: Joi.string().min(1).max(50),
	nombre: Joi.string().min(1).max(20),
	apellidos: Joi.string().min(1).max(50),
	fecha_nacimiento: Joi.date(),
	telefono: Joi.string(),
	bio: Joi.string(),
	foto: Joi.string(),
});

module.exports = pullUserSchema;
