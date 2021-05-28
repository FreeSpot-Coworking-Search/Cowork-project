require('dotenv').config();

//MODULOS CON LOS QUE VAMOS A TRABAJAR
// PARA POBLAR LA BASE DE DATOS
const faker = require('faker/locale/es');
const { getConnection } = require('./db');
const { random } = require('lodash');
const { formatDateToDB } = require('./helpers');

const fecha = faker.date.recent();
console.log(fecha);
fecha.setDate(fecha.getDate() + 10);
console.log(fecha);
