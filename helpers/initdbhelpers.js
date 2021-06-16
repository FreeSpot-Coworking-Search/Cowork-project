require('dotenv').config();
const faker = require('faker/locale/es');
const { getConnection } = require('./dbHelpers');
const { random } = require('lodash');
const { formatDateToDB } = require('./dateHelpers');

async function resetDB() {
	let connection;

	try {
		// TODOSSS!!!
		// - Afinar fecha de reserva.
		// - Afinar fechas de nacimientos.
		// - Crear CIF centros.

		//MODULOS CON LOS QUE VAMOS A TRABAJAR
		// PARA POBLAR LA BASE DE DATOS

		const espacios = 100;
		const usuarios = 100;
		const centros = 10;
		const administradores = 100;
		const servicios = [
			'Acceso 24/7',
			'Aire acondicionado / calefacción',
			'Alarma',
			'Café de cortesía',
			'Catering',
			'Cocina',
			'Coworking Visa',
			'Domicilación fiscal',
			'Domiciliación social',
			'Equipo de sonido',
			'Fotocopiadora',
			'Gestión de agendas (secretaria virtual)',
			'Gestión de eventos',
			'Impresora / escaner',
			'Internet + wifi',
			'Oficina virtual',
			'Parking',
			'Pizarra / Flipchart',
			'Proyector',
			'Prueba gratuita',
			'Recepción',
			'Recepción de emails',
			'Recepción de llamadas',
			'Recepción paquetería',
			'Sala de reuniones',
			'Secretaría',
			'TV',
			'Uso de dirección',
		];
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
      password VARCHAR(50) NOT NULL,
      nombre_usuario VARCHAR(50) NOT NULL,
      nombre VARCHAR(20) NOT NULL,
      apellidos VARCHAR(50) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      telefono VARCHAR(20),
      bio TEXT,
      foto VARCHAR(512),
      borrado BOOLEAN NOT NULL DEFAULT 0
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
            tipo ENUM ('Mesa Flex','Mesa Fija','Despacho','Sala de reuniones') NOT NULL,
            descripcion VARCHAR(1000),
            capacidad_maxima TINYINT UNSIGNED NOT NULL,
            estado BOOLEAN NOT NULL DEFAULT 1,
            visible BOOLEAN NOT NULL DEFAULT 1,
            reserva_minima INT UNSIGNED DEFAULT 1 NOT NULL,
            precio DECIMAL(6,2) NOT NULL,
            id_centro INT UNSIGNED,
            FOREIGN KEY (id_centro) REFERENCES centros (id),
            borrado BOOLEAN NOT NULL DEFAULT 0
            );
            `);

		// ********************** CREANDO TABLA ESPACIOS_SERVICIOS *********************

		console.log('Creando tabla de espacios_servicios');

		await connection.query(`
            CREATE TABLE espacios_servicios(
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
                borrado BOOLEAN NOT NULL DEFAULT 0
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

		// ********************** CREANDO TABLA ADMINISTRSADORES *********************

		console.log('Creando tabla administradores');

		await connection.query(`
                  CREATE TABLE administradores(
                    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                    correo VARCHAR(50) NOT NULL UNIQUE,
                    contrasena VARCHAR(50) NOT NULL,
                    nombre VARCHAR(20) NOT NULL,
                    apellidos VARCHAR(50) NOT NULL,
                    fecha_nacimiento DATE NOT NULL,
                    foto VARCHAR(512)
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

		//  ******************************************************************************
		//  ************************* CREANDO CONTENIDOS *********************************
		//  ******************************************************************************

		//  ********************** CREANDO CONTENIDO USUARIOS ****************************

		console.log('Creando usuarios');

		for (let i = 0; i < usuarios; i++) {
			const correo = faker.internet.email();
			const password = faker.internet.password();
			const nombre_usuario = faker.internet.userName();
			const nombre = faker.name.firstName();
			const apellidos = faker.name.lastName();
			const fechaNacimiento = formatDateToDB(faker.date.past());
			const telefono = faker.phone.phoneNumber();
			const bio = faker.lorem.words(25);

			await connection.query(
				`INSERT INTO usuarios(
          correo,
          password,
          nombre_usuario,
          nombre,
          apellidos,
          fecha_nacimiento,
          telefono,
          bio
          )
          VALUES(
            "${correo}",
            "${password}",
            "${nombre_usuario}",
            "${nombre}",
            "${apellidos}",
            "${fechaNacimiento}",
            "${telefono}",
            "${bio}"
            )
            `
			);
		}

		//  ********************** CREANDO CONTENIDO RESERVAS E INCIDENCIAS ****************************

		console.log('Creando reservas, reservas_servicios e incidencias');

		let idReserva = 0;

		for (let i = 0; i < espacios; i++) {
			const randomDate = faker.date.past(0.5);
			const numeroReservas = random(1, 10);

			for (let j = 0; j < numeroReservas; j++) {
				const fechaInicio = formatDateToDB(randomDate);
				randomDate.setDate(randomDate.getDate() + random(1, 30));
				const fechaFin = formatDateToDB(randomDate);
				randomDate.setDate(randomDate.getDate() + random(1, 15));

				const precio = faker.commerce.price(200, 300);
				const puntuacionUsuario = random(0, 5);
				const comentarioUsuario = faker.lorem.words(13);
				const idUsuario = random(0, usuarios);
				const idEspacio = i;

				await connection.query(
					`INSERT INTO reservas(
                  fecha_reserva,
                  fecha_inicio,
                  fecha_fin,
                  precio,
                  puntuacion_usuario,
                  comentario_usuario,
                  id_usuario,
                  id_espacio
                  )
                  VALUES(
                    "${fechaInicio}",
                    "${fechaInicio}",
                    "${fechaFin}",
                    "${precio}",
                    "${puntuacionUsuario}",
                    "${comentarioUsuario}",
                    "${idUsuario}",
                    "${idEspacio}"
                    )
                    `
				);
				if (random(1, 10) < 2) {
					const categoria = 'Categoria 1';
					// Mejora de fechaIncidencia!
					const fechaIncidencia = fechaInicio;
					const descripcion = faker.lorem.words(13);
					let respuesta = '';
					let estado = 0;

					if (random(0, 1)) {
						respuesta = faker.lorem.words(13);
						estado = 1;
					}

					await connection.query(
						`INSERT INTO incidencias(
          categoria, 
          fecha_incidencia, 
          descripcion,
          respuesta,
          estado,
          id_reserva
            )
            VALUES(
              "${categoria}",
              "${fechaIncidencia}",
              "${descripcion}",
              "${respuesta}",
              "${estado}",
              "${idReserva}"
              )
              `
					);
				}
				// ********************** CREANDO CONTENIDO RESERVAS_SERVICIOS *********************

				if (random(1, 5) === 1) {
					const idServicio = random(1, servicios.length);
					const precio = faker.commerce.price(1, 2);
					await connection.query(
						`INSERT INTO reservas_servicios(
                  id_reserva,
                  id_servicio,
                  precio
                  )
                  VALUES(
                    "${idReserva}",
                    "${idServicio}",
                    "${precio}"
                    )
                    `
					);
				}
				idReserva++;
			}
		}

		// ********************** CREANDO CONTENIDO ESPACIOS *********************

		console.log('Creando espacios');

		for (let i = 0; i < espacios * 0.3; i++) {
			const tipo = 'Mesa Flex';
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = 1;
			const precio = faker.commerce.price(3, 15);
			const idCentro = random(1, 30);

			await connection.query(
				`INSERT INTO espacios(
                      tipo,
                      descripcion,
                      capacidad_maxima,
                      precio,
                      id_centro
                      )
                      VALUES(
                        "${tipo}",
                        "${descripcion}",
                        "${capacidadMaxima}",
                        "${precio}",
                        "${idCentro}"
                        )
                        `
			);
		}
		for (let i = 0; i < espacios * 0.3; i++) {
			const tipo = 'Mesa Fija';
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = 1;
			const precio = faker.commerce.price(5, 15);
			const idCentro = random(1, 30);

			await connection.query(
				`INSERT INTO espacios(
                            tipo,
                            descripcion,
                            capacidad_maxima,
                            precio,
                            id_centro
                            )
                            VALUES(
                              "${tipo}",
                              "${descripcion}",
                              "${capacidadMaxima}",
                              "${precio}",
                              "${idCentro}"
                              )
                              `
			);
		}
		for (let i = 0; i < espacios * 0.2; i++) {
			const tipo = 'Despacho';
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = random(1, 4);
			const precio = faker.commerce.price(10, 20);
			const idCentro = random(1, 30);

			await connection.query(
				`INSERT INTO espacios(
                                  tipo,
                                  descripcion,
                                  capacidad_maxima,
                                  precio,
                                  id_centro
                                  )
                                  VALUES(
                                    "${tipo}",
                                    "${descripcion}",
                                    "${capacidadMaxima}",
                                    "${precio}",
                                    "${idCentro}"
                                    )
                                    `
			);
		}
		for (let i = 0; i < espacios * 0.1; i++) {
			const tipo = 'Sala de reuniones';
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = random(5, 20);
			const precio = faker.commerce.price(15, 30);
			const idCentro = random(1, 30);

			await connection.query(
				`INSERT INTO espacios(
                                        tipo,
                                        descripcion,
                                        capacidad_maxima,
                                        precio,
                                        id_centro
                                        )
                                        VALUES(
                                          "${tipo}",
                                          "${descripcion}",
                                          "${capacidadMaxima}",
                                          "${precio}",
                                          "${idCentro}"
                                          )
                                          `
			);
		}

		// ********************** CREANDO CONTENIDO ESPACIOS_SERVICIOS *********************

		console.log('Creando espacios_servicios');

		for (let i = 0; i < espacios; i++) {
			for (let j = 0; j < servicios.length; j++) {
				if (random(0, 1)) {
					await connection.query(
						`INSERT INTO espacios_servicios(
              id_espacio,
              id_servicio
              )
              VALUES(
                "${i}",
                "${j}"
                )
                `
					);
				}
			}
		}

		// ********************** CREANDO CONTENIDO SERVICIOS *********************

		console.log('Creando servicios');

		for (let i = 0; i < servicios.length; i++) {
			await connection.query(
				`INSERT INTO servicios(
                nombre
                )
                VALUES(
                  "${servicios[i]}"
                  )
                  `
			);
		}

		// ********************** CREANDO CONTENIDO CENTROS *********************

		console.log('Creando centros');

		for (let i = 0; i < centros; i++) {
			const nombre = faker.company.companyName();
			const nombreFiscal = nombre + ' S.L.';
			const direccion = faker.address.streetAddress();
			const localidad = faker.address.city();
			const codigoPostal = faker.address.zipCode();
			const iban = faker.finance.iban();
			const telefono = faker.phone.phoneNumber();
			const email = faker.internet.email();
			const descripcion = faker.lorem.words(25);
			const equipamiento = faker.lorem.words(25);
			const idAdministrador = i < 175 ? i : random(1, 175);

			await connection.query(
				`INSERT INTO centros(
                      nombre,
                      nombre_fiscal,
                      direccion,
                      localidad,
                      codigo_postal,
                      iban,
                      telefono,
                      email,
                      descripcion,
                      equipamiento,
                      id_administrador
                      )
                      VALUES(
                        "${nombre}",
                        "${nombreFiscal}",
                        "${direccion}",
                        "${localidad}",
                        "${codigoPostal}",
                        "${iban}",
                        "${telefono}",
                        "${email}",
                        "${descripcion}",
                        "${equipamiento}",
                        "${idAdministrador}"
                        )
                        `
			);
		}

		// ********************** CREANDO CONTENIDO ADMINISTRADORES *********************

		console.log('Creando administradores');

		for (let i = 0; i < administradores; i++) {
			const correo = faker.internet.email();
			const contrasena = faker.internet.password();
			const nombre = faker.name.firstName();
			const apellidos = faker.name.lastName();
			const fechaNacimiento = formatDateToDB(faker.date.past());
			const foto = faker.image.avatar();

			await connection.query(
				`INSERT INTO administradores(
          correo,
          contrasena,
          nombre,
          apellidos,
          fecha_nacimiento,
          foto
          )
          VALUES(
            "${correo}",
            "${contrasena}",
            "${nombre}",
            "${apellidos}",
            "${fechaNacimiento}",
            "${foto}"
            )
            `
			);
		}
		// ********************** CREANDO CONTENIDO IMAGENES *********************

		console.log('Creando imagenes');

		for (let i = 0; i < centros; i++) {
			const idCentro = i;
			const descripcion = faker.lorem.words(5);
			const URL = faker.image.imageUrl();

			await connection.query(
				`INSERT INTO imagenes(
          URL,
          descripcion,
          id_centro
          )
          VALUES(
            "${URL}",
            "${descripcion}",
            "${idCentro}"
            )
            `
			);
		}

		for (let i = 0; i < espacios; i++) {
			const idEspacio = i;
			const descripcion = faker.lorem.words(5);
			const URL = faker.image.imageUrl();

			await connection.query(
				`INSERT INTO imagenes(
          URL,
          descripcion,
          id_espacio
          )
          VALUES(
            "${URL}",
            "${descripcion}",
            "${idEspacio}"
            )
            `
			);
		}

		// ********************** FIN DE LA CREACIÓN *********************

		await connection.query(`
          SET FOREIGN_KEY_CHECKS = 0;
          `);
	} catch (error) {
		console.error(error);
	} finally {
		if (connection) connection.release();
		console.log('Todo hecho, liberando conexión');
		return true;
	}
}
module.exports = {
	resetDB,
};
