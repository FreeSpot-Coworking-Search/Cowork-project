const Joi = require('joi');

const postSpaceSchema = Joi.object().keys({
	tipo: Joi.valid(
		'Mesa Flex',
		'Mesa Fija',
		'Despacho',
		'Sala de reuniones'
	).required(),
	nombre: Joi.string().required().min(1).max(20),
	descripcion: Joi.string().max(1000).allow(null, ''),
	capacidad_maxima: Joi.number().required().integer(),
	estado: Joi.valid(0, 1).required(),
	visible: Joi.valid(0, 1).required(),
	reserva_minima: Joi.number().required().max(365),
	precio: Joi.number().required().precision(2),
	id_centro: Joi.number().required().integer(),
	servicios: Joi.array(),
	servicios_extra: Joi.array(),
});

const putSpaceSchema = Joi.object().keys({
	tipo: Joi.valid('Mesa Flex', 'Mesa Fija', 'Despacho', 'Sala de reuniones'),
	nombre: Joi.string().min(1).max(20),
	descripcion: Joi.string().max(1000).allow(null, ''),
	capacidad_maxima: Joi.number().integer(),
	estado: Joi.valid(0, 1),
	visible: Joi.valid(0, 1),
	reserva_minima: Joi.number().max(365),
	precio: Joi.number().precision(2),
	id_centro: Joi.number().integer(),
	servicios: Joi.array(),
	servicios_extra: Joi.array(),
});

module.exports = { postSpaceSchema, putSpaceSchema };

// CREATE TABLE espacios(
//     tipo ENUM ('Mesa Flex','Mesa Fija','Despacho','Sala de reuniones') NOT NULL,
//     descripcion VARCHAR(1000),
//     capacidad_maxima TINYINT UNSIGNED NOT NULL,
//     estado BOOLEAN NOT NULL DEFAULT 1,
//     visible BOOLEAN NOT NULL DEFAULT 1,
//     reserva_minima INT UNSIGNED DEFAULT 1 NOT NULL,
//     precio DECIMAL(6,2) NOT NULL,
//     id_centro INT UNSIGNED,
//     FOREIGN KEY (id_centro) REFERENCES centros (id),
//     borrado BOOLEAN NOT NULL DEFAULT 0
//     );
