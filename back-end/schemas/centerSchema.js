const Joi = require('joi');

const postCenterSchema = Joi.object().keys({
	nombre: Joi.string().min(1).max(50),
	nombre_fiscal: Joi.string().required().min(1).max(50),
	direccion: Joi.string().required().min(1).max(50),
	localidad: Joi.string().required().min(1).max(70),
	codigo_postal: Joi.string().required().min(1).max(10),
	iban: Joi.string().required().min(1).max(34),
	telefono: Joi.string().max(15),
	email: Joi.string().required().email().max(50),
	equipamiento: Joi.string().max(1000),
	descripcion: Joi.string().max(1000),
	latitud: Joi.string().required().min(1).max(34),
	longitud: Joi.string().required().min(1).max(34),
});

const putCenterSchema = Joi.object().keys({
	nombre: Joi.string().min(1).max(50),
	nombre_fiscal: Joi.string().min(1).max(50),
	direccion: Joi.string().min(1).max(50),
	localidad: Joi.string().min(1).max(70),
	codigo_postal: Joi.string().min(1).max(10),
	iban: Joi.string().min(1).max(34),
	telefono: Joi.string().max(15),
	email: Joi.string().email().max(50),
	equipamiento: Joi.string().max(1000),
	descripcion: Joi.string().max(1000),
	latitud: Joi.string().required().min(1).max(34),
	longitud: Joi.string().required().min(1).max(34),
});

module.exports = { postCenterSchema, putCenterSchema };

/* 
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    nombre_fiscal VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    localidad VARCHAR(70) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    iban VARCHAR(34) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    equipamiento VARCHAR(1000),
    descripcion TEXT,
    id_administrador INT UNSIGNED,
    FOREIGN KEY (id_administrador) REFERENCES administradores(id),
    borrado BOOLEAN NOT NULL DEFAULT 0 
*/
