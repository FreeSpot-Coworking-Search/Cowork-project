const Joi = require('joi');

const postReserveSchema = Joi.object().keys({
	fecha_inicio: Joi.date().required(),
	fecha_fin: Joi.date().required(),
	id_espacio: Joi.number().integer().required(),
});

module.exports = postReserveSchema;

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
