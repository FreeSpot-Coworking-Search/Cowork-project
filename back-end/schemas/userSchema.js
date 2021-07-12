const Joi = require('joi');

const postUserSchema = Joi.object().keys({
	correo: Joi.string().required().email(),
	password: Joi.string().required().min(8).max(100),
	nombre_usuario: Joi.string().required().min(1).max(50),
	nombre: Joi.string().required().min(1).max(20),
	apellidos: Joi.string().required().min(1).max(50),
	fecha_nacimiento: Joi.date().required(),
	telefono: Joi.string(),
	bio: Joi.string(),
	foto: Joi.string(),
});

const putUserSchema = Joi.object().keys({
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

module.exports = { postUserSchema, putUserSchema };
