const express = require('express');
const app = express();
const { getConnection, insertNewUser } = require('./helpers/dbhelpers');
const { resetDB } = require('./helpers/initdbhelpers');
const faker = require('faker/locale/es');

// TODO - pasar a variables de entorno!!!
const PORT = 3000;

app.use(express.json());

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

app.get('/api/users', (req, res) => res.send('Eres una petición de usuarios!'));

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  insertNewUser(newUser);
  console.log(req.body);
  res.send('Eres una inserción usuarios!');
});

app.put('/api/users', (req, res) =>
  res.send('Eres una modificación de usuarios!')
);

// *****************
// ** /API/ADMINS **
// *****************

app.use((req, res) => res.send('Hola mundo!'));

app.listen(PORT);
