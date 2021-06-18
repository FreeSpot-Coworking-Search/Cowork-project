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
});

module.exports = postUserSchema;

/*
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      correo VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(50) NOT NULL,
      nombre_usuario VARCHAR(50) NOT NULL,
      nombre VARCHAR(20) NOT NULL,
      apellidos VARCHAR(50) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      telefono VARCHAR(20),
      bio TEXT,
      foto VARCHAR(512),
      borrado BOOLEAN NOT NULL DEFAULT 0,
      activo BOOLEAN NOT NULL DEFAULT 0,
	  roll ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
	  codigo_registro VARCHAR(100),
	  fecha_creacion DATETIME NOT NULL,
	  fecha_modificacion DATETIME,
	  codigo_recuperacion VARCHAR(100)
      */
