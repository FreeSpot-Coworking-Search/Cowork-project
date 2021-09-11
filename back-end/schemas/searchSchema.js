const Joi = require('joi');

const searchCentersSchema = Joi.object().keys({
	texto: Joi.string(),
	tipo: Joi.valid('Mesa Flex', 'Mesa Fija', 'Despacho', 'Sala de reuniones'),
	aforo: Joi.number().integer(),
	precio_maximo: Joi.number().precision(2),
	precio_minimo: Joi.number().precision(2),
	puntuacion_minima: Joi.number().integer(),
	dias_estancia: Joi.number().max(365),
	servicios: Joi.array(),
	ordenado_por: Joi.string(),
	orden: Joi.valid('ascendente', 'descendente'),
	fecha_entrada: Joi.date(),
	fecha_salida: Joi.date(),
});
const searchSpacesSchema = Joi.object().keys({
	texto: Joi.string(),
	id_centro: Joi.number().integer().required(),
	tipo: Joi.valid('Mesa Flex', 'Mesa Fija', 'Despacho', 'Sala de reuniones'),
	aforo: Joi.number().integer(),
	precio_maximo: Joi.number().precision(2),
	precio_minimo: Joi.number().precision(2),
	puntuacion_minima: Joi.number().integer(),
	dias_estancia: Joi.number().max(365),
	servicios: Joi.array(),
	ordenado_por: Joi.string(),
	orden: Joi.valid('ascendente', 'descendente'),
	fecha_entrada: Joi.date(),
	fecha_salida: Joi.date(),
});
module.exports = {
	searchCentersSchema,
	searchSpacesSchema,
};
