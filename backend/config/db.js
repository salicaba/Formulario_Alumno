// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

connection.connect(err => {
  if (err) {
    console.error('--- ERROR AL CONECTAR A LA BASE DE DATOS ---', err);
    return;
  }
  console.log('Conectado exitosamente a la base de datos MySQL.');
});

// Exportamos la conexión normal (compatible con callbacks)
module.exports = connection;