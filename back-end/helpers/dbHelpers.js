require('dotenv').config();
const mysql = require('mysql2/promise');
const { formatDateToDB } = require('./dateHelpers');

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

const insertRegistration = async (table, newRegistration) => {
	let connection;
	try {
		connection = await getConnection();
		const [result] = await connection.query(
			createInsertQuerry(table, newRegistration)
		);
		return result;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
};
const getRegistrations = async (tableOrQuery, searchObject) => {
	let connection;
	try {
		connection = await getConnection();
		if (searchObject)
			tableOrQuery = createSelectAllWhereQuerry(
				tableOrQuery,
				searchObject
			);
		const [results] = await connection.query(tableOrQuery);
		return results;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
};
const updateRegistration = async (table, id, updateObject) => {
	let connection;
	try {
		connection = await getConnection();
		await connection.query(createUpdateQuerry(table, id, updateObject));
		return true;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
};
const deleteRegistrations = async (table, searchObject) => {
	let connection;
	try {
		connection = await getConnection();
		await connection.query(createDeleteQuerry(table, searchObject));
		return true;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
};
const getSearchCenters = async (searchObject) => {
	let connection;
	try {
		connection = await getConnection();
		const [result] = await connection.query(
			createSearchCentersQuerry(searchObject)
		);
		return result;
	} catch (error) {
		return error;
	} finally {
		if (connection) connection.release();
	}
};

const getSearchSpaces = async (searchObject) => {
	let connection;
	try {
		connection = await getConnection();
		const [result] = await connection.query(
			createSearchSpacesQuerry(searchObject)
		);
		return result;
	} catch (error) {
		return error;
	} finally {
		if (connection) connection.release();
	}
};

// ***********************
// ** QUERY GENERATORS **
// ***********************

const createSelectAllWhereQuerry = (table, searchObject) => {
	let query = `SELECT * FROM ${table} WHERE `;
	const keyWhereString = [];
	for (const key in searchObject) {
		keyWhereString.push(` ${key} = "${searchObject[key]}"`);
	}
	query += keyWhereString.join(' AND ');
	if (
		table === 'usuarios' ||
		table === 'espacios' ||
		table === 'centros' ||
		table === 'administradores'
	) {
		query += ' AND borrado <> 1;';
	} else query += ';';

	return query;
};

const createInsertQuerry = (table, updateObject) => {
	let query = `INSERT INTO ${table} SET`;
	const keyUpdateString = [];
	for (const key in updateObject) {
		keyUpdateString.push(` ${key} = "${updateObject[key]}"`);
	}
	query += keyUpdateString.join(',');
	return query;
};
const createUpdateQuerry = (table, id, updateObject) => {
	let query = `UPDATE ${table} SET`;
	const keyUpdateString = [];
	for (const key in updateObject) {
		keyUpdateString.push(` ${key} = "${updateObject[key]}"`);
	}
	query += keyUpdateString.join(',');
	query += ` WHERE id = ${id};`;
	return query;
};
const createDeleteQuerry = (table, searchObject) => {
	let query = `DELETE FROM ${table} WHERE `;
	const keyUpdateString = [];
	for (const key in searchObject) {
		keyUpdateString.push(` ${key} = "${searchObject[key]}"`);
	}
	query += keyUpdateString.join(' AND ');
	query += ';';
	return query;
};
const createSearchCentersQuerry = (searchObject) => {
	let query = `SELECT  centros.id, centros.nombre, centros.direccion, centros.localidad, centros.codigo_postal, centros.telefono, centros.email, centros.equipamiento, centros.descripcion, MIN(espacios.precio) AS precio_minimo , 
	MAX(espacios.precio) AS precio_maximo , AVG(reservas.puntuacion_usuario) AS puntuacion_media , COUNT(espacios.id) AS espacios_disponibles 
	FROM centros 
	INNER JOIN espacios ON centros.id = espacios.id_centro
	INNER JOIN reservas ON reservas.id_espacio = espacios.id `;
	const whereString = [];
	const havingString = [];

	whereString.push('( espacios.borrado = 0 )');
	whereString.push('( centros.borrado = 0 )');

	if (searchObject['tipo']) {
		whereString.push(`(espacios.tipo = "${searchObject['tipo']}")`);
	}
	if (searchObject['texto']) {
		whereString.push(
			`(centros.localidad LIKE "%${searchObject['texto']}%" OR centros.direccion LIKE "%${searchObject['texto']}%" OR centros.nombre LIKE "%${searchObject['texto']}%" )`
		);
	}
	if (searchObject['aforo']) {
		whereString.push(
			`(espacios.capacidad_maxima >= ${searchObject['aforo']})`
		);
	}
	if (searchObject['dias_estancia']) {
		whereString.push(
			`(espacios.reserva_minima >= ${searchObject['dias_estancia']})`
		);
	}
	if (searchObject['precio_maximo']) {
		whereString.push(
			`(espacios.precio <= ${searchObject['precio_maximo']})`
		);
	}
	if (searchObject['precio_minimo']) {
		whereString.push(
			`(espacios.precio >= ${searchObject['precio_minimo']})`
		);
	}

	if (searchObject['servicios']) {
		const servicesArray = [];
		let servicesString = `(espacios.id IN (SELECT  espacios_servicios.id_espacio
        FROM espacios_servicios 
        WHERE `;
		for (const servicio of searchObject['servicios']) {
			servicesArray.push(
				`(espacios_servicios.id_servicio = ${servicio})`
			);
		}
		servicesString += `(${servicesArray.join(' OR ')})`;
		servicesString += ` GROUP BY espacios_servicios.id_espacio
			HAVING COUNT(espacios_servicios.id_servicio) = ${servicesArray.length}))`;
		whereString.push(servicesString);
	}

	if (searchObject['fecha_entrada'] && searchObject['fecha_salida']) {
		const fechaEntrada = formatDateToDB(searchObject['fecha_entrada']);
		const fechaSalida = formatDateToDB(searchObject['fecha_salida']);

		whereString.push(
			`(espacios.id NOT IN
				(SELECT reservas.id_espacio
					FROM reservas
					WHERE ("${fechaEntrada}" > reservas.fecha_inicio AND "${fechaEntrada}" < reservas.fecha_fin )
					OR ("${fechaSalida}" > reservas.fecha_inicio AND "${fechaSalida}" < reservas.fecha_fin)
					OR (reservas.fecha_inicio >= "${fechaEntrada}" AND reservas.fecha_fin <= "${fechaSalida}") ))`
		);
	}
	if (whereString.length > 0) {
		query += 'WHERE ';
		query += whereString.join(' AND ');
	}

	query += ' GROUP BY centros.id';

	if (searchObject['puntuacion_minima']) {
		havingString.push(
			`(puntuacion_media >= ${searchObject['puntuacion_minima']})`
		);
	}

	if (havingString.length > 0) {
		query += ' HAVING ';
		query += havingString.join(' AND ');
	}

	if (searchObject['ordenado_por']) {
		query += ` ORDER BY ${searchObject['ordenado_por']} `;
		if (searchObject['orden'] && searchObject['orden'] === 'ascendente')
			query += 'ASC';
		else if (
			searchObject['orden'] &&
			searchObject['orden'] === 'descendente'
		)
			query += 'DESC';
	}
	query += ';';
	return query;
};

const createSearchSpacesQuerry = (searchObject) => {
	let query = `SELECT  espacios.id, espacios.tipo, espacios.descripcion, espacios.capacidad_maxima, espacios.reserva_minima, espacios.precio, espacios.id_centro
	FROM espacios 
	INNER JOIN reservas ON reservas.id_espacio = espacios.id `;
	const whereString = [];

	whereString.push('( espacios.borrado = 0 )');

	if (searchObject['id_centro']) {
		whereString.push(
			`(espacios.id_centro = ${searchObject['id_centro']} )`
		);
	}
	if (searchObject['tipo']) {
		whereString.push(`(espacios.tipo = "${searchObject['tipo']}")`);
	}
	if (searchObject['aforo']) {
		whereString.push(
			`(espacios.capacidad_maxima >= ${searchObject['aforo']})`
		);
	}
	if (searchObject['dias_estancia']) {
		whereString.push(
			`(espacios.reserva_minima >= ${searchObject['dias_estancia']})`
		);
	}
	if (searchObject['precio_maximo']) {
		whereString.push(
			`(espacios.precio <= ${searchObject['precio_maximo']})`
		);
	}
	if (searchObject['precio_minimo']) {
		whereString.push(
			`(espacios.precio >= ${searchObject['precio_minimo']})`
		);
	}

	if (searchObject['servicios']) {
		const servicesArray = [];
		let servicesString = `(espacios.id IN (SELECT  espacios_servicios.id_espacio
        FROM espacios_servicios 
        WHERE `;
		for (const servicio of searchObject['servicios']) {
			servicesArray.push(
				`(espacios_servicios.id_servicio = ${servicio})`
			);
		}
		servicesString += `(${servicesArray.join(' OR ')})`;
		servicesString += ` GROUP BY espacios_servicios.id_espacio
			HAVING COUNT(espacios_servicios.id_servicio) = ${servicesArray.length}))`;
		whereString.push(servicesString);
	}

	if (searchObject['fecha_entrada'] && searchObject['fecha_salida']) {
		const fechaEntrada = formatDateToDB(searchObject['fecha_entrada']);
		const fechaSalida = formatDateToDB(searchObject['fecha_salida']);

		whereString.push(
			`(espacios.id NOT IN
				(SELECT reservas.id_espacio
					FROM reservas
					WHERE ("${fechaEntrada}" > reservas.fecha_inicio AND "${fechaEntrada}" < reservas.fecha_fin )
					OR ("${fechaSalida}" > reservas.fecha_inicio AND "${fechaSalida}" < reservas.fecha_fin)
					OR (reservas.fecha_inicio >= "${fechaEntrada}" AND reservas.fecha_fin <= "${fechaSalida}")))`
		);
	}
	if (whereString.length > 0) {
		query += 'WHERE ';
		query += whereString.join(' AND ');
	}

	query += ' GROUP BY espacios.id ';

	if (searchObject['ordenado_por']) {
		query += ` ORDER BY ${searchObject['ordenado_por']} `;
		if (searchObject['orden'] && searchObject['orden'] === 'ascendente')
			query += 'ASC';
		else if (
			searchObject['orden'] &&
			searchObject['orden'] === 'descendente'
		)
			query += 'DESC';
	}
	query += ';';
	return query;
};

module.exports = {
	getConnection,
	getRegistrations,
	insertRegistration,
	updateRegistration,
	deleteRegistrations,
	getSearchCenters,
	getSearchSpaces,
	createSelectAllWhereQuerry,
};
