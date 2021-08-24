require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { SERVER_HOST, SERVER_PORT, FRONT_ORIGIN } = process.env;

const corsOptions = {
	origin: FRONT_ORIGIN,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());

//app.use(express.static('static'));

app.use('/api/reset', require('./controlers/db'));
app.use('/api/users', require('./controlers/users'));
app.use('/api/spaces', require('./controlers/spaces'));
app.use('/api/admins', require('./controlers/admins'));
app.use('/api/centers', require('./controlers/centers'));
app.use('/api/reserves', require('./controlers/reserves'));
app.use('/api/incidences', require('./controlers/incidences'));
app.use('/api/images', require('./controlers/photos'));
app.use('/api/search', require('./controlers/searchs'));
app.use('/api/mycenter', require('./controlers/myCenter'));

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
