// backend/controllers/estudianteController.js
const Estudiante = require('../models/estudianteModel');

exports.obtenerTodos = (req, res) => {
  Estudiante.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.agregar = (req, res) => {
  Estudiante.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Estudiante agregado con éxito' });
  });
};

exports.actualizar = (req, res) => {
  Estudiante.update(req.params.documento, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Estudiante actualizado con éxito' });
  });
};

exports.eliminar = (req, res) => {
  Estudiante.delete(req.params.documento, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Estudiante eliminado con éxito' });
  });
};