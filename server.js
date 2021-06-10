const express = require('express');
const app = express();
const { resetDB } = require('./helpers/initdbhelpers');

const getUser = require('./controlers/getUser');
const postUser = require('./controlers/postUser');

const morgan = require('morgan');

// TODO - pasar a variables de entorno!!!
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

// ****************
// ** /API/RESET **
// ****************

app.get('/api/reset', (req, res) => {
	resetDB();
	res.send('Eres una petición de reseteo de la BD!');
});

// ****************
// ** /API/USERS **
// ****************
app.get('/api/users/', getUser);
app.post('/api/users/', postUser);

// app.put('/api/users', (req, res) =>
//   res.send('Eres una modificación de usuarios!')
// );

// *****************
// ** /API/ADMINS **
// *****************

// ************
// ** ERRORS **
// ************

app.use((error, req, res, next) => {
	console.log(error);
	res.status(error.httpStatus || 500).send({
		status: 'error',
		message: error.message,
	});
});
app.use((req, res) => {
	res.status(404).send({
		status: 'error',
		message: 'No encontrado',
	});
});

app.listen(PORT, () =>
	console.log(`Server listening at http://localhost:${PORT}`)
);
