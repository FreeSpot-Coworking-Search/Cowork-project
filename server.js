require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const { resetDB } = require('./helpers/initDbHelpers');
const { SERVER_HOST, SERVER_PORT } = process.env;

const morgan = require('morgan');

const getReset = require('./controlers/db/getReset');

const userExists = require('./middlewares/users/userExists');
const userIsLogin = require('./middlewares/users/userIsLogin');
const spaceExists = require('./middlewares/spaces/spaceExist');
const userIsOwner = require('./middlewares/users/userIsOwner');

const getUser = require('./controlers/users/getUser');
const postUser = require('./controlers/users/postUser');
const putUser = require('./controlers/users/putUser');
const deleteUser = require('./controlers/users/deleteUser');
const loginUser = require('./controlers/users/loginUser');

const getSpace = require('./controlers/spaces/getSpace');
const postSpace = require('./controlers/spaces/postSpace');
const putSpace = require('./controlers/spaces/putSpace');
const deleteSpace = require('./controlers/spaces/deleteSpace');
const postPhotoUser = require('./controlers/photos/postPhotoUser');

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());

// ****************
// ** /API/RESET **
// ****************

app.get('/api/reset/', getReset);

// ***********************
// ** /API/USERS/LOGIN/ **
// ***********************

app.post('/api/users/login', loginUser);

// ****************
// ** /API/USERS **
// ****************

app.get('/api/users/', getUser);
app.post('/api/users/', postUser, getUser);
app.put('/api/users/', userIsLogin, userIsOwner, userExists, putUser, getUser);
app.delete('/api/users/', userIsLogin, userExists, deleteUser);

app.post('/api/users/photo/', postPhotoUser, getUser);

// *****************
// ** /API/ADMINS **
// *****************

// TODO - Ricardo

// ******************
// ** /API/CENTERS **
// ******************

// TODO - Ricardo

// *****************
// ** /API/SPACES **
// *****************

app.get('/api/spaces/', getSpace);
app.post('/api/spaces/', postSpace, getSpace);
app.put('/api/spaces/', spaceExists, putSpace, getSpace);
app.delete('/api/spaces/', spaceExists, deleteSpace);

// ************************
// ** /API/RESSERVATIONS **
// ************************

// app.get('/api/reservations/', getReservation);
// app.post('/api/reservations/', postReservation);
// app.put('/api/reservations/', reservationExists, putReservation, getReservation);
// app.delete('/api/reservations/', reservationExists, deleteReservation);

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
