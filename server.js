require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');

const app = express();
const { SERVER_HOST, SERVER_PORT } = process.env;

const getReset = require('./controlers/db/getReset');

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());

app.get('/api/reset/', getReset);
app.use('/api/users', require('./controlers/users'));
app.use('/api/spaces', require('./controlers/spaces'));
app.use('/api/admins', require('./controlers/admins'));
app.use('/api/centers', require('./controlers/centers'));
app.use('/api/reserves', require('./controlers/reserves'));

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

app.listen(SERVER_PORT, SERVER_HOST, () =>
	console.log(`Server listening at http://${SERVER_HOST}:${SERVER_PORT}`)
);
