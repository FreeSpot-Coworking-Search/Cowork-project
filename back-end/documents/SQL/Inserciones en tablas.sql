INSERT INTO usuarios
(correo,password,nombre_usuario,nombre,apellidos,fecha_nacimiento,telefono,bio,foto)
VALUES
("${correo}","${password}","${nombre_usuario}","${nombre}","${apellidos}","${fechaNacimiento}","${telefono}","${bio}","${foto}");
		        
INSERT INTO reservas
(fecha_reserva,fecha_inicio,fecha_fin,precio,puntuacion_usuario,comentario_usuario,id_usuario,id_espacio)
VALUES
("${fechaInicio}","${fechaInicio}","${fechaFin}","${precio}","${puntuacionUsuario}","${comentarioUsuario}","${idUsuario}","${idEspacio}");

INSERT INTO incidencias
(categoria,fecha_incidencia,descripcion,respuesta,estado,id_reserva)
VALUES
("${categoria}","${fechaIncidencia}","${descripcion}","${respuesta}","${estado}","${idReserva}");

INSERT INTO espacios
(tipo,descripcion,capacidad_maxima,precio,id_centro)
VALUES
("${tipo}","${descripcion}","${capacidadMaxima}","${precio}","${idCentro}");

INSERT INTO espacios
(tipo,descripcion,capacidad_maxima,precio,id_centro)
VALUES
("${tipo}","${descripcion}","${capacidadMaxima}","${precio}","${idCentro}");

INSERT INTO espacios
(tipo,descripcion,capacidad_maxima,precio,id_centro)
VALUES
("${tipo}","${descripcion}","${capacidadMaxima}","${precio}","${idCentro}");

INSERT INTO espacios_servicios
(id_espacio,id_servicio)
VALUES
("${i}","${j}");

INSERT INTO servicios
(nombre)
VALUES
("${servicios[i]}");

INSERT INTO centros
(nombre,nombre_fiscal,direccion,localidad,codigo_postal,iban,telefono,email,descripcion,equipamiento,id_administrador)
VALUES
("${nombre}","${nombreFiscal}","${direccion}","${localidad}","${codigoPostal}","${iban}","${telefono}","${email}","${descripcion}","${equipamiento}","${idAdministrador}");

INSERT INTO administradores
(correo,contrasena,nombre,apellidos,fecha_nacimiento,foto)
VALUES
("${correo}","${contrasena}","${nombre}","${apellidos}","${fechaNacimiento}","${foto}");

INSERT INTO imagenes
(URL,descripcion,id_centro)
VALUES
("${URL}","${descripcion}","${idCentro}");

INSERT INTO imagenes
(URL,descripcion,id_espacio)
VALUES
("${URL}","${descripcion}","${idEspacio}");