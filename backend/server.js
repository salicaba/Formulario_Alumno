// --- 1. CARGA DE VARIABLES DE ENTORNO ---
// Esta debe ser la PRIMERA línea de código para asegurar que las variables estén disponibles.
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
// Usamos la variable de entorno PORT del archivo .env
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- 2. CREACIÓN DE LA CONEXIÓN A LA BASE DE DATOS ---
// Usamos las variables de entorno para la conexión
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

// --- 3. CONEXIÓN A LA BASE DE DATOS ---
db.connect(err => {
  if (err) {
    console.error('--- ERROR FATAL AL CONECTAR A LA BASE DE DATOS ---');
    console.error('Revisa tus credenciales en el archivo .env');
    console.error(err);
    console.error('----------------------------------------------------');
    return;
  }
  console.log('Conectado exitosamente a la base de datos MySQL.');
});

// --- 4. RUTAS DE LA API (Endpoints) ---

// OBTENER todos los estudiantes
app.get('/api/estudiantes', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) {
      console.error("ERROR AL LEER:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// AGREGAR un nuevo estudiante
app.post('/api/estudiantes', (req, res) => {
  const { documento_alumno, nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno } = req.body;
  const sql = 'INSERT INTO estudiantes (documento, nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?, ?)';
  const values = [documento_alumno, nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("ERROR AL INSERTAR:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Estudiante insertado correctamente.");
    res.status(201).json({ message: 'Estudiante agregado' });
  });
});

// ACTUALIZAR un estudiante
app.put('/api/estudiantes/:documento', (req, res) => {
  const { documento } = req.params;
  const { nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno } = req.body;
  const sql = 'UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE documento = ?';
  const values = [nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno, documento];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("ERROR AL ACTUALIZAR:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Estudiante actualizado correctamente.");
    res.json({ message: 'Estudiante actualizado' });
  });
});

// ELIMINAR un estudiante
app.delete('/api/estudiantes/:documento', (req, res) => {
  const { documento } = req.params;
  db.query('DELETE FROM estudiantes WHERE documento = ?', [documento], (err, result) => {
    if (err) {
      console.error("ERROR AL ELIMINAR:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Estudiante eliminado correctamente.");
    res.json({ message: 'Estudiante eliminado' });
  });
});

// --- 5. INICIO DEL SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor backend (PWEB) corriendo en http://localhost:${port}`);
});
