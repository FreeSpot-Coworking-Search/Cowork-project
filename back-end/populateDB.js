require('dotenv').config();
const bcrypt = require('bcryptjs');
const faker = require('faker/locale/es');
const { random } = require('lodash');

const { getConnection } = require('./helpers/dbHelpers');
const { formatDateToDB } = require('./helpers/dateHelpers');

async function populateDB() {
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

		await connection.query(`
        SET FOREIGN_KEY_CHECKS = 0;`);

		//  ******************************************************************************
		//  ************************* CREANDO CONTENIDOS *********************************
		//  ******************************************************************************

		//  ********************** CREANDO CONTENIDO USUARIOS ****************************

		console.log('Creando usuarios');

		const now = formatDateToDB(new Date());

		await connection.query(
			`INSERT INTO usuarios(
	  correo,
	  password,
	  nombre_usuario,
	  nombre,
	  apellidos,
	  fecha_nacimiento,
	  telefono,
	  bio,
	  fecha_creacion,
	  roll,
	  activo
	  )
	  VALUES(
		"jcoastmail@gmail.com",
		"${await bcrypt.hash('password1234', 10)}",
		"jCoast",
		"Dani",
		"Martinez",
		"1982-10-04",
		"666666666",
		"Hola soy Dani",
		"${now}",
		"admin",
		"1"
		)
		`
		);

		await connection.query(
			`INSERT INTO usuarios(
	  correo,
	  password,
	  nombre_usuario,
	  nombre,
	  apellidos,
	  fecha_nacimiento,
	  telefono,
	  bio,
	  fecha_creacion,
	  roll,
	  activo
	  )
	  VALUES(
		"richardzarroca@gmail.com",
		"${await bcrypt.hash('user123456', 10)}",
		"rzarroca",
		"Ricardo",
		"Zarroca",
		"1990-06-13",
		"+34123456",
		"Hola soy Ricardo",
		"${now}",
		"admin",
		"1"
		)
		`
		);

		for (let i = 0; i < usuarios; i++) {
			const correo = faker.internet.email();
			const password = faker.internet.password();
			const passwordHash = await bcrypt.hash(password, 10);
			const nombre_usuario = faker.internet.userName();
			const nombre = faker.name.firstName();
			const apellidos = faker.name.lastName();
			const fechaNacimiento = formatDateToDB(faker.date.past());
			const telefono = faker.phone.phoneNumber();
			const bio = faker.lorem.words(25);
			const fechaCreacion = now;

			await connection.query(
				`INSERT INTO usuarios(
		  correo,
		  password,
		  nombre_usuario,
		  nombre,
		  apellidos,
		  fecha_nacimiento,
		  telefono,
		  bio,
		  fecha_creacion,
		  activo
		  )
		  VALUES(
		    "${correo}",
		    "${passwordHash}",
		    "${nombre_usuario}",
		    "${nombre}",
		    "${apellidos}",
		    "${fechaNacimiento}",
		    "${telefono}",
		    "${bio}",
			"${fechaCreacion}",
			"1"
		    )
		    `
			);
		}

		//  ********************** CREANDO CONTENIDO RESERVAS E INCIDENCIAS ****************************

		console.log('Creando reservas, reservas_servicios e incidencias');

		let idReserva = 1;

		for (let i = 1; i <= espacios; i++) {
			const randomDate = faker.date.past(0.5);
			const numeroReservas = random(1, 10);

			for (let j = 1; j <= numeroReservas; j++) {
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
                  id_espacio,
				  pagado
                  )
                  VALUES(
                    "${fechaInicio}",
                    "${fechaInicio}",
                    "${fechaFin}",
                    "${precio}",
                    "${puntuacionUsuario}",
                    "${comentarioUsuario}",
                    "${idUsuario}",
                    "${idEspacio}",
					"1"
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
			const nombre = faker.commerce.color();
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = 1;
			const precio = faker.commerce.price(3, 15);
			const idCentro = random(1, centros);
			const reservaMinima = random(1, 15);

			await connection.query(
				`INSERT INTO espacios(
                      tipo,
					  nombre,
                      descripcion,
                      capacidad_maxima,
					  reserva_minima,
                      precio,
                      id_centro
                      )
                      VALUES(
                        "${tipo}",
                        "${nombre}",
                        "${descripcion}",
                        "${capacidadMaxima}",
                        "${reservaMinima}",
                        "${precio}",
                        "${idCentro}"
                        )
                        `
			);
		}
		for (let i = 0; i < espacios * 0.3; i++) {
			const tipo = 'Mesa Fija';
			const nombre = faker.commerce.color();
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = 1;
			const precio = faker.commerce.price(5, 15);
			const idCentro = random(1, centros);
			const reservaMinima = random(1, 15);

			await connection.query(
				`INSERT INTO espacios(
                      tipo,
					  nombre,
                      descripcion,
                      capacidad_maxima,
					  reserva_minima,
                      precio,
                      id_centro
                      )
                      VALUES(
                        "${tipo}",
						"${nombre}",
                        "${descripcion}",
                        "${capacidadMaxima}",
                        "${reservaMinima}",
                        "${precio}",
                        "${idCentro}"
                        )
                        `
			);
		}
		for (let i = 0; i < espacios * 0.2; i++) {
			const tipo = 'Despacho';
			const nombre = faker.commerce.color();
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = random(1, 4);
			const precio = faker.commerce.price(10, 20);
			const idCentro = random(1, centros);
			const reservaMinima = random(1, 15);

			await connection.query(
				`INSERT INTO espacios(
                      tipo,
					  nombre,
                      descripcion,
                      capacidad_maxima,
					  reserva_minima,
                      precio,
                      id_centro
                      )
                      VALUES(
                        "${tipo}",
						"${nombre}",
                        "${descripcion}",
                        "${capacidadMaxima}",
                        "${reservaMinima}",
                        "${precio}",
                        "${idCentro}"
                        )
                        `
			);
		}
		for (let i = 0; i < espacios * 0.2; i++) {
			const tipo = 'Sala de reuniones';
			const nombre = faker.commerce.color();
			const descripcion = faker.lorem.words(25);
			const capacidadMaxima = random(5, 20);
			const precio = faker.commerce.price(15, 30);
			const idCentro = random(1, centros);

			await connection.query(
				`INSERT INTO espacios(
					tipo,
					nombre,
					descripcion,
					capacidad_maxima,
					precio,
					id_centro
					)
					VALUES(
						"${tipo}",
						"${nombre}",
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

		for (let i = 1; i <= espacios; i++) {
			for (let j = 1; j <= servicios.length; j++) {
				if (random(0, 1)) {
					await connection.query(
						`INSERT INTO espacios_servicios(
			precio,
              id_espacio,
              id_servicio
              )
              VALUES(
				  null,
                "${i}",
                "${j}"
                )
                `
					);
				} else if (random(0, 1)) {
					const precio = faker.commerce.price(1, 2);
					await connection.query(
						`INSERT INTO espacios_servicios(
			precio,
              id_espacio,
              id_servicio
              )
              VALUES(
                "${precio}",
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

		const locations = [
			{
				lat: 43.22,
				long: -5.5,
			},
			{
				lat: 43.22,
				long: -8.23,
			},
			{
				lat: 40.24,
				long: -3.41,
			},
			{
				lat: 40.3,
				long: -4.54,
			},
			{
				lat: 42.34,
				long: -7.86464,
			},
			{
				lat: 40.57,
				long: -5.4,
			},
			{
				lat: 39.32,
				long: -5.05,
			},
			{
				lat: 41.48,
				long: -1.2,
			},
			{
				lat: 40.3,
				long: -1.26,
			},
			{
				lat: 41.17,
				long: -4.41,
			},
		];

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
			const latitud = locations[i].lat;
			const longitud = locations[i].long;

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
                      id_administrador,
					  fecha_creacion,
					  latitud,
					  longitud
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
                        "${idAdministrador}",
						"${now}",
						"${latitud}",
						"${longitud}"
                        )
                        `
			);
		}

		// ********************** CREANDO CONTENIDO ADMINISTRADORES *********************

		console.log('Creando administradores');

		await connection.query(
			`INSERT INTO administradores(
	  correo,
	  password,
	  nombre,
	  apellidos,
	  fecha_nacimiento,
	  activo,
	  fecha_creacion,
	  roll
	  )
	  VALUES(
		"jcoastmail@gmail.com",
		"${await bcrypt.hash('password1234', 10)}",
		"Dani",
		"Martinez",
		"1982-10-04",
		"1",
		"${now}",
		"admin"
		)
		`
		);

		await connection.query(
			`INSERT INTO administradores(
	  correo,
	  password,
	  nombre,
	  apellidos,
	  fecha_nacimiento,
	  activo,
	  fecha_creacion,
	  roll
	  )
	  VALUES(
		"richardzarroca@gmail.com",
		"${await bcrypt.hash('admin123456', 10)}",
		"Ricardo",
		"Zarroca",
		"1990-06-13",
		"1",
		"${now}",
		"admin"
		)
		`
		);

		for (let i = 0; i < administradores; i++) {
			const correo = faker.internet.email();
			const password = faker.internet.password();
			const passwordHash = await bcrypt.hash(password, 10);
			const nombre = faker.name.firstName();
			const apellidos = faker.name.lastName();
			const fechaNacimiento = formatDateToDB(faker.date.past());
			const foto = faker.image.avatar();

			await connection.query(
				`INSERT INTO administradores(
          correo,
          password,
          nombre,
          apellidos,
          fecha_nacimiento,
          foto,
		  activo,
		  fecha_creacion
          )
          VALUES(
            "${correo}",
            "${passwordHash}",
            "${nombre}",
            "${apellidos}",
            "${fechaNacimiento}",
            "${foto}",
			"1",
			"${now}"
            )
            `
			);
		}

		// ********************** CREANDO CONTENIDO IMAGENES *********************

		console.log('Creando imagenes');

		for (let i = 0; i < espacios; i++) {
			for (let j = 0; j < 3; j++) {
				await connection.query(
					`INSERT INTO imagenes(
							  URL,
							  descripcion,
							  id_espacio
							  )
							  VALUES(
								"SpaceRandom${random(1, 20)}.jpeg",
								"foto",
								"${i + 1}"
								)
								`
				);
			}
		}
		for (let i = 0; i < centros; i++) {
			for (let j = 0; j < 3; j++) {
				await connection.query(
					`INSERT INTO imagenes(
							  URL,
							  descripcion,
							  id_centro
							  )
							  VALUES(
								"CenterRandom${random(1, 9)}.jpeg",
								"foto",
								"${i + 1}"
								)
								`
				);
			}
		}

		// ********************** FIN DE LA CREACIÓN *********************

		await connection.query(`
        SET FOREIGN_KEY_CHECKS = 1;`);
	} catch (error) {
		console.error(error);
	} finally {
		if (connection) connection.release();
		console.log('Todo hecho, liberando conexión');
		return true;
	}
}

populateDB();
