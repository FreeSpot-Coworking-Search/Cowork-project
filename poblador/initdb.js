require('dotenv').config();

//MODULOS CON LOS QUE VAMOS A TRABAJAR
// PARA POBLAR LA BASE DE DATOS
const faker = require('faker/locale/es');
const { getConnection } = require('./db');
const { random } = require('lodash');
const { formatDateToDB } = require('./helpers');

let connection;

async function main() {
  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    // Borrar las tablas si existen (diary, diary_votes)
    console.log('Borrando tablas');
    await connection.query('DROP TABLE IF EXISTS reservas CASCADE');
    await connection.query('DROP TABLE IF EXISTS usuarios CASCADE');
    await connection.query('DROP TABLE IF EXISTS incidencias CASCADE');
    await connection.query('DROP TABLE IF EXISTS espacios CASCADE');
    await connection.query('DROP TABLE IF EXISTS espacios_servicios CASCADE');
    await connection.query('DROP TABLE IF EXISTS centros CASCADE');
    await connection.query('DROP TABLE IF EXISTS administradores CASCADE');
    await connection.query('DROP TABLE IF EXISTS imagenes CASCADE');

    // Crear las tablas de jugadores
    console.log('Creando tablas');
    await connection.query(`
    SET FOREIGN_KEY_CHECKS = 0;`);

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
      foto VARCHAR(512)
      );
    `);

    console.log('Creando usuarios');

    const usuarios = 100;
    for (let i = 0; i < usuarios; i++) {
      const correo = faker.internet.email();
      const password = faker.internet.password();
      const nombre_usuario = faker.internet.userName();
      const nombre = faker.name.firstName();
      const apellidos = faker.name.lastName();
      const fechaNacimiento = formatDateToDB(faker.date.past());
      const telefono = faker.phone.phoneNumber();
      const bio = faker.lorem.words(25);
      const foto = faker.image.avatar();

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
          foto
            )
            VALUES(
            "${correo}",
            "${password}",
            "${nombre_usuario}",
            "${nombre}",
            "${apellidos}",
            "${fechaNacimiento}",
            "${telefono}",
            "${bio}",
            "${foto}"
             )
            `
      );
    }

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

    //creamos tabla de incidencias
    console.log('Creando tabla incidencias');
    await connection.query(`
      CREATE TABLE incidencias(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        categoria ENUM ('Categoria 1','Categoria 2','Categoria 3'),
        fecha_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL,
        descripcion VARCHAR(1000) NOT NULL,
        respuesta VARCHAR(1000),
        estado BOOLEAN NOT NULL DEFAULT FALSE,
        id_reserva INT UNSIGNED,
        FOREIGN KEY (id_reserva) REFERENCES reservas (id)
        )
        `);

    //creamos tabla de fotos de los espacios
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
          FOREIGN KEY (id_centro) REFERENCES centros (id)
          );
          `);

    console.log('Creando espacios');
    const espacios = 700;
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

    //creamos tabla de espacios_servicios
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
    //creamos tabla de servicios
    console.log('Creando tabla de servicios');
    await connection.query(`
    CREATE TABLE servicios(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(50)
      );
      `);

    console.log('Creando servicios');

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

    //creamos tabla de centros
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
            FOREIGN KEY (id_administrador) REFERENCES administradores(id)
              );
              `);

    console.log('Creando centros');

    const centros = 30;
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

    console.log('Creando administradores');

    const administradores = 175;
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
                SET FOREIGN_KEY_CHECKS = 0;
                `);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Todo hecho, liberando conexión');
    if (connection) connection.release();
    process.exit();
  }
}
main();
