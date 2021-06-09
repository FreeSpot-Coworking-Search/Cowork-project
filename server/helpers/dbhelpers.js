require('dotenv').config();
const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'Z',
    });
  }

  return await pool.getConnection();
}

const insertNewUser = async (user) => {
  connection = await getConnection();
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
            "${user.mail}",
            "${user.password}",
            "${user.userName}",
            "${user.name}",
            "${user.lastName}",
            "${user.birthDay}",
            "${user.phone}",
            "${user.bio}",
            "${user.avatar}"
            )
            `
  );
};

module.exports = {
  getConnection,
  insertNewUser,
};
