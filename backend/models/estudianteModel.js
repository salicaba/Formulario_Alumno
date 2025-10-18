// backend/models/estudianteModel.js
const db = require('../config/db');

// Obtener todos los estudiantes
exports.getAll = (callback) => {
  db.query('SELECT * FROM estudiantes', callback);
};

// Crear un nuevo estudiante
exports.create = (data, callback) => {
  const sql = 'INSERT INTO estudiantes (documento, nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?, ?)';
  const values = [data.documento_alumno, data.nombre_alumno, data.apellido_alumno, data.correo_alumno, data.telefono_alumno];
  db.query(sql, values, callback);
};

// Actualizar un estudiante
exports.update = (documento, data, callback) => {
  const sql = 'UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE documento = ?';
  const values = [data.nombre_alumno, data.apellido_alumno, data.correo_alumno, data.telefono_alumno, documento];
  db.query(sql, values, callback);
};

// Eliminar un estudiante
exports.delete = (documento, callback) => {
  db.query('DELETE FROM estudiantes WHERE documento = ?', [documento], callback);
};