const Joi = require('joi');

const postIncidenceSchema = Joi.object().keys({
	categoria: Joi.string()
		.valid('Categoria 1', 'Categoria 2', 'Categoria 3')
		.required(),
	descripcion: Joi.string().min(5).max(1000).required(),
});

const putIncidenceSchema = Joi.object().keys({
	respuesta: Joi.string().max(1000),
});

module.exports = { postIncidenceSchema, putIncidenceSchema };

/* 
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    categoria ENUM ('Categoria 1','Categoria 2','Categoria 3'),
    fecha_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    respuesta VARCHAR(1000),
    estado BOOLEAN NOT NULL,
    id_reserva INT UNSIGNED,
    FOREIGN KEY (id_reserva) REFERENCES reservas (id)
 */
