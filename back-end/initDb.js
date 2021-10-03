require('dotenv').config();
const { getConnection } = require('./helpers/dbHelpers');

async function resetDB() {
	let connection;

	try {
		// Conseguir conexión a la base de datos
		connection = await getConnection();

		// Borrar las tablas si existen (diary, diary_votes)
		console.log('Borrando tablas');
		await connection.query(
			'DROP TABLE IF EXISTS reservas_servicios CASCADE'
		);
		await connection.query(
			'DROP TABLE IF EXISTS espacios_servicios CASCADE'
		);
		await connection.query('DROP TABLE IF EXISTS servicios CASCADE');
		await connection.query('DROP TABLE IF EXISTS imagenes CASCADE');
		await connection.query('DROP TABLE IF EXISTS incidencias CASCADE');
		await connection.query('DROP TABLE IF EXISTS reservas CASCADE');
		await connection.query('DROP TABLE IF EXISTS usuarios CASCADE');
		await connection.query('DROP TABLE IF EXISTS espacios CASCADE');
		await connection.query('DROP TABLE IF EXISTS centros CASCADE');
		await connection.query('DROP TABLE IF EXISTS administradores CASCADE');

		//  ******************************************************************************
		//  ************************* CREANDO TABLAS *************************************
		//  ******************************************************************************

		console.log('Creando tablas');

		await connection.query(`
    SET FOREIGN_KEY_CHECKS = 0;`);

		// ************************* CREANDO TABLA USUARIOS ****************************

		console.log('Creando tabla de usuarios');

		await connection.query(`
    CREATE TABLE usuarios(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      correo VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
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
      );
      `);

		// ************************* CREANDO TABLA RESERVAS **************************

		console.log('Creando tabla reservas');

		await connection.query(`
      CREATE TABLE reservas(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL,
        fecha_inicio TIMESTAMP NOT NULL,
        fecha_fin TIMESTAMP NOT NULL,
        precio DECIMAL(6,2) NOT NULL,
        puntuacion_usuario TINYINT UNSIGNED,
        comentario_usuario VARCHAR(1000),
		pagado BOOLEAN NOT NULL DEFAULT 0,
		codigo_pago VARCHAR(100),
        id_usuario INT UNSIGNED,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
        id_espacio INT UNSIGNED,
        FOREIGN KEY (id_espacio) REFERENCES espacios (id)
        );
        `);

		// ********************** CREANDO TABLA INCIDENCIAS ************************

		console.log('Creando tabla incidencias');

		await connection.query(`
        CREATE TABLE incidencias(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          categoria ENUM ('Categoria 1','Categoria 2','Categoria 3'),
          fecha_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL,
          descripcion VARCHAR(1000) NOT NULL,
          respuesta VARCHAR(1000),
          estado BOOLEAN NOT NULL,
          id_reserva INT UNSIGNED,
          FOREIGN KEY (id_reserva) REFERENCES reservas (id)
          )
          `);

		// ********************** CREANDO TABLA ESPACIOS ************************

		console.log('Creando tabla de espacios');

		await connection.query(`
          CREATE TABLE espacios(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
			nombre VARCHAR(20) NOT NULL,
            tipo ENUM ('Mesa Flex','Mesa Fija','Despacho','Sala de reuniones') NOT NULL,
            precio DECIMAL(6,2) NOT NULL,
            capacidad_maxima TINYINT UNSIGNED NOT NULL,
            reserva_minima INT UNSIGNED DEFAULT 1 NOT NULL,
            estado BOOLEAN NOT NULL DEFAULT 1,
            descripcion VARCHAR(1000),
            visible BOOLEAN NOT NULL DEFAULT 1,
            borrado BOOLEAN NOT NULL DEFAULT 0,
            id_centro INT UNSIGNED,
            FOREIGN KEY (id_centro) REFERENCES centros (id)
            );
            `);

		// ********************** CREANDO TABLA ESPACIOS_SERVICIOS *********************

		console.log('Creando tabla de espacios_servicios');

		await connection.query(`
            CREATE TABLE espacios_servicios(
			precio DECIMAL(6,2),
              id_espacio INT UNSIGNED,
              FOREIGN KEY (id_espacio) REFERENCES espacios(id),
              id_servicio INT UNSIGNED,
              FOREIGN KEY (id_servicio) REFERENCES servicios(id),
              PRIMARY KEY(id_espacio, id_servicio)
              );
              `);

		// ********************** CREANDO TABLA RESERVAS_SERVICIOS *********************

		console.log('Creando tabla de reservas_servicios');

		await connection.query(`
            CREATE TABLE reservas_servicios(
              precio DECIMAL(6,2),
              id_reserva INT UNSIGNED,
              FOREIGN KEY (id_reserva) REFERENCES reservas(id),
              id_servicio INT UNSIGNED,
              FOREIGN KEY (id_servicio) REFERENCES servicios(id),
              PRIMARY KEY(id_reserva, id_servicio)
              );
              `);

		// ********************** CREANDO TABLA CENTROS *********************

		console.log('Creando tabla centros');

		// CREAR CIF!!!!!!!!!!

		await connection.query(`
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
                id_administrador INT UNSIGNED,
                FOREIGN KEY (id_administrador) REFERENCES administradores(id),
                borrado BOOLEAN NOT NULL DEFAULT 0,
				fecha_creacion DATETIME NOT NULL,
				fecha_modificacion DATETIME,
				latitud DECIMAL(9,6),
				longitud DECIMAL(9,6)
                );
                `);

		// ********************** CREANDO TABLA SERVICIOS *********************

		console.log('Creando tabla de servicios');

		await connection.query(`
                CREATE TABLE servicios(
                  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                  nombre VARCHAR(50)
                  );
                  `);

		// ********************** CREANDO TABLA ADMINISTRADORES *********************

		console.log('Creando tabla administradores');

		await connection.query(`
                  CREATE TABLE administradores(
                    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                    correo VARCHAR(50) NOT NULL UNIQUE,
                    password VARCHAR(100) NOT NULL,
                    nombre VARCHAR(20) NOT NULL,
                    apellidos VARCHAR(50) NOT NULL,
                    fecha_nacimiento DATE NOT NULL,
                    foto VARCHAR(512),
					borrado BOOLEAN NOT NULL DEFAULT 0,
					activo BOOLEAN NOT NULL DEFAULT 0,
					roll ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
					codigo_registro VARCHAR(100),
					fecha_creacion DATETIME NOT NULL,
					fecha_modificacion DATETIME,
					codigo_recuperacion VARCHAR(100)
                    );
                    `);

		// ********************** CREANDO TABLA IMAGENES *********************

		console.log('Creando tabla imagenes');

		await connection.query(`
                    CREATE TABLE imagenes(
                      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                      URL VARCHAR(512) NOT NULL,
                      descripcion VARCHAR(200),
                      id_centro INT UNSIGNED,
                      FOREIGN KEY (id_centro) REFERENCES centros(id),
                      id_espacio INT UNSIGNED,
                      FOREIGN KEY (id_espacio) REFERENCES espacios(id)
                      );
                      `);

		await connection.query(`
                      SET FOREIGN_KEY_CHECKS = 1;
                      `);
	} catch (error) {
		console.error(error);
	} finally {
		if (connection) connection.release();
		console.log('Todo hecho, liberando conexión');
		return true;
	}
}

resetDB();
