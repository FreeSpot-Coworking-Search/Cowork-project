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
	id_centro: Joi.number().integer().required(),
	tipo: Joi.valid('Mesa Flex', 'Mesa Fija', 'Despacho', 'Sala de reuniones'),
	aforo: Joi.number().integer(),
	precio_maximo: Joi.number().precision(2),
	precio_minimo: Joi.number().precision(2),
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

// {
//     "texto": "avalos",
//     "aforo": 19,
//     "fecha_entrada": "2021-03-10",
//     "fecha_salida": "2021-03-13",
//     "precio_maximo": 10,
//     "precio_minimo": 4,
//     "puntuacion_minima": 2,
//     "dias_estancia": 10,
//     "servicios": [1,3,5,6,7,8,9,10,11,12,13,14,15,2,16,17],
//     "ordenado_por": "precio",
//     "orden": "descendente"
// }
