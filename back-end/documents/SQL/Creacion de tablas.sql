
CREATE TABLE espacios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
tipo ENUM ('Mesa Flex','Mesa Fija','Despacho','Sala de reuniones') NOT NULL,
descripcion VARCHAR(1000),
capacidad_maxima TINYINT UNSIGNED NOT NULL,
estado BOOLEAN NOT NULL DEFAULT 1,
visible BOOLEAN NOT NULL DEFAULT 1,
reserva_minima INT UNSIGNED DEFAULT 1 NOT NULL,
precio DECIMAL(6,2) NOT NULL,
id_centro INT UNSIGNED,FOREIGN KEY (id_centro) REFERENCES centros (id),
borrado BOOLEAN NOT NULL DEFAULT 0
);
    
CREATE TABLE espacios_servicios(
id_espacio INT UNSIGNED,FOREIGN KEY (id_espacio) REFERENCES espacios(id),
id_servicio INT UNSIGNED,FOREIGN KEY (id_servicio) REFERENCES servicios(id),
PRIMARY KEY(id_espacio, id_servicio));

CREATE TABLE reservas_servicios(
precio DECIMAL(6,2),
id_reserva INT UNSIGNED,FOREIGN KEY (id_reserva) REFERENCES reservas(id),
id_servicio INT UNSIGNED,FOREIGN KEY (id_servicio) REFERENCES servicios(id),
PRIMARY KEY(id_reserva, id_servicio));
              
CREATE TABLE centros(
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
id_administrador INT UNSIGNED,FOREIGN KEY (id_administrador) REFERENCES administradores(id),
borrado BOOLEAN NOT NULL DEFAULT 0);

CREATE TABLE servicios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50));

CREATE TABLE administradores(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
correo VARCHAR(50) NOT NULL UNIQUE,
contrasena VARCHAR(50) NOT NULL,
nombre VARCHAR(20) NOT NULL,
apellidos VARCHAR(50) NOT NULL,
fecha_nacimiento DATE NOT NULL,
foto VARCHAR(512));

CREATE TABLE imagenes(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
URL VARCHAR(512) NOT NULL,
descripcion VARCHAR(200),
id_centro INT UNSIGNED,FOREIGN KEY (id_centro) REFERENCES centros(id),
id_espacio INT UNSIGNED,FOREIGN KEY (id_espacio) REFERENCES espacios(id));
