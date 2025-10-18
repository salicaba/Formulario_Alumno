// backend/routes/estudiantesRoutes.js
const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Rutas para el CRUD de estudiantes
router.get('/', estudianteController.obtenerTodos);
router.post('/', estudianteController.agregar);
router.put('/:documento', estudianteController.actualizar);
router.delete('/:documento', estudianteController.eliminar);

module.exports = router;