const Joi = require('joi');

const postReserveSchema = Joi.object().keys({
	fecha_inicio: Joi.date().min('now').required(),
	fecha_fin: Joi.date().min(Joi.ref('fecha_inicio')).required(),
	id_espacio: Joi.number().integer().required(),
});

const putRateSchema = Joi.object().keys({
	puntuacion_usuario: Joi.number()
		.integer()
		.positive()
		.min(1)
		.max(5)
		.required(),
	comentario_usuario: Joi.string().max(1000),
});

module.exports = { postReserveSchema, putRateSchema };

/* 
CREATE TABLE reservas(
xx id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    --fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    precio DECIMAL(6,2) NOT NULL,
    x-puntuacion_usuario TINYINT UNSIGNED,
    x-comentario_usuario VARCHAR(1000),
    --id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
    id_espacio INT UNSIGNED,
    FOREIGN KEY (id_espacio) REFERENCES espacios (id)
    ); 
*/
