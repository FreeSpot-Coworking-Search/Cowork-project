const searchObject = {
	select: {
		usuarios: 'all',
		centros: ['nombre', 'telefono'],
	},
	where: {
		operand1: { usuario: 'id', operator: '<>', operand: 1 },
		operator: 'AND',
		operand2: { usuario: 'id', operator: '<>', operand: 1 },
	},
	orderBy: {
		usuarios: ['nombre', 'telefono'],
		centros: ['nombre', 'telefono'],
	},
};

console.log(__dirname);

// const createSelectQuerry = (searchObject) => {
// 	let query = '';

// 	if (Object.hasOwnProperty.call(searchObject, 'select')) {
// 		query += 'SELECT ';
// 		let selectValues = [];
// 		let selectFrom = [];
// 		for (const table in searchObject.select) {
// 			if (
// 				typeof searchObject.select[table] === 'string' &&
// 				searchObject.select[table] === 'all'
// 			) {
// 				selectValues = [`${table}.*`];
// 			} else
// 				for (const value of searchObject.select[table]) {
// 					if (typeof value === 'object') {
// 						for (const key in value) {
// 							selectValues.push(
// 								`${key.toUpperCase()} (${table}.${value[key]})`
// 							);
// 						}
// 					} else {
// 						selectValues.push(`${table}.${value}`);
// 					}
// 				}
// 			selectFrom.push(`${table}`);
// 		}
// 		query += `${selectValues.join(' , ')} FROM ${selectFrom.join(' , ')}`;
// 	}

// 	if (Object.hasOwnProperty.call(searchObject, 'where')) {
// 		query += ` WHERE ${searchObject.where} `;
// 	}

// 	if (Object.hasOwnProperty.call(searchObject, 'orderBy')) {
// 		query += ' ORDER BY ';
// 		let orderByValues = [];
// 		for (const table in searchObject.orderBy) {
// 			for (const value of searchObject.orderBy[table]) {
// 				orderByValues.push(`${table}.${value}`);
// 			}
// 		}
// 		query += `${orderByValues.join(' , ')}`;
// 	}
// 	return query;
// };

// const createWhereQuery = (whereObject) => {
// 	let query = '';
// 	let whereQuery = [];
// 	for (const key in whereObject) {
// 		if (key === 'operand1' || key === 'operand2' || key === 'operator') {
// 			if (typeof whereObject[key] === 'object') {
// 				whereQuery.push(createWhereQuery(whereObject[key]));
// 			} else whereQuery.push(whereObject[key]);
// 		} else whereQuery.push(`${key}.${whereObject[key]}`);
// 	}
// 	query += `( ${whereQuery.join(' ')} )`;
// 	return query;
// };

// const createSelectQuerry = (searchObject) => {
// 	let query = '';

// 	if (Object.hasOwnProperty.call(searchObject, 'select')) {
// 		query += 'SELECT ';
// 		let selectValues = [];
// 		let selectFrom = [];
// 		for (const table in searchObject.select) {
// 			if (
// 				typeof searchObject.select[table] === 'string' &&
// 				searchObject.select[table] === 'all'
// 			) {
// 				selectValues = [`${table}.*`];
// 			} else
// 				for (const value of searchObject.select[table]) {
// 					if (typeof value === 'object') {
// 						for (const key in value) {
// 							selectValues.push(
// 								`${key.toUpperCase()} (${table}.${value[key]})`
// 							);
// 						}
// 					} else {
// 						selectValues.push(`${table}.${value}`);
// 					}
// 				}
// 			selectFrom.push(`${table}`);
// 		}
// 		query += `${selectValues.join(' , ')} FROM ${selectFrom.join(' , ')}`;
// 	}

// 	if (Object.hasOwnProperty.call(searchObject, 'where')) {
// 		query += ` WHERE ${createWhereQuery(searchObject.where)}`;
// 	}

// 	if (Object.hasOwnProperty.call(searchObject, 'orderBy')) {
// 		query += ' ORDER BY ';
// 		let orderByValues = [];
// 		for (const table in searchObject.orderBy) {
// 			for (const value of searchObject.orderBy[table]) {
// 				orderByValues.push(`${table}.${value}`);
// 			}
// 		}
// 		query += `${orderByValues.join(' , ')}`;
// 	}
// 	return query;
// };

// console.log(createSelectQuerry(searchObject));

// const sentences = Object.keys(searchObject);
// for (const sentence of sentences) {
// 	if (sentence === 'select') {
// 		query += 'SELECT ';
// 		for (const table in searchObject.select) {
// searchObject.select			}
// 		}

// 		console.log(createSelectQuerry(queryObject));

// 	}
// }

// 	let query = `SELECT * FROM ${table} WHERE `;
// 	const keyWhereString = [];
// 	for (const key in searchObject) {
// 		keyWhereString.push(` ${key} = "${searchObject[key]}"`);
// 	}
// 	query += keyWhereString.join(' AND ');
// 	query += ' AND borrado <> 1;';
// 	return query;
// };

// const createUpdateQuerry = (table, id, update) => {
// 	let query = `UPDATE ${table} SET`;
// 	const keyUpdateString = [];
// 	for (const key in update) {
// 		if (update.hasOwnProperty.call(update, key)) {
// 			keyUpdateString.push(` ${key} = "${update[key]}"`);
// 		}
// 	}
// 	query += keyUpdateString.join(',');
// 	query += ` WHERE id = ${id};`;
// 	return query;
// };

// const createSelectQuerry = (values, searchObject) => {
// 	let query = `SELECT * FROM ${table} WHERE `;
// 	const keyWhereString = [];
// 	for (const key in searchObject) {
// 		keyWhereString.push(` ${key} = "${searchObject[key]}"`);
// 	}
// 	query += keyWhereString.join(' AND ');
// 	query += ' AND borrado <> 1;';
// 	return query;
// };
// console.log(createUpdateQuerry(table, id, update));
// const values = {
// 	usuarios: ['id', 'nombre'],
// 	centros: ['id', 'nombre']
// }
