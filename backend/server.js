// Contenido para server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'gestion_estudiantes'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado exitosamente a la base de datos MySQL.');
});

// Rutas de la API (Endpoints)
app.get('/api/estudiantes', (req, res) => {
    db.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/estudiantes', (req, res) => {
    const { documento_alumno, nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno } = req.body;
    const sql = 'INSERT INTO estudiantes (documento, nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?, ?)';
    const values = [documento_alumno, nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno];
    db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Estudiante agregado' });
    });
});

app.put('/api/estudiantes/:documento', (req, res) => {
    const { documento } = req.params;
    const { nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno } = req.body;
    const sql = 'UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE documento = ?';
    const values = [nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno, documento];
    db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Estudiante actualizado' });
    });
});

app.delete('/api/estudiantes/:documento', (req, res) => {
    const { documento } = req.params;
    db.query('DELETE FROM estudiantes WHERE documento = ?', [documento], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Estudiante eliminado' });
    });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});