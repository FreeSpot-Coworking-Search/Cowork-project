require('dotenv').config();

//MODULOS CON LOS QUE VAMOS A TRABAJAR
// PARA POBLAR LA BASE DE DATOS
const faker = require('faker/locale/es');
const { getConnection } = require('./db');
const { random } = require('lodash');
const { formatDateToDB } = require('./helpers');

const randomDate = faker.date.past(0.5);
const reserveDate = new Date();
const numeroReservas = random(1, 10);

for (let i = 0; i < numeroReservas; i++) {
  reserveDate.setDate(randomDate.getDate());
  console.log(`Reserva:${reserveDate}`);
  console.log(`Incio:${randomDate}`);
  randomDate.setDate(randomDate.getDate() + random(1, 30));
  console.log(`Fin:${randomDate}`);
  randomDate.setDate(randomDate.getDate() + random(1, 15));
}
