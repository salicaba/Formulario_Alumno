// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db'); // Solo necesitamos que se ejecute la conexión

const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite al servidor entender JSON

// --- Rutas ---
const estudiantesRoutes = require('./routes/estudiantesRoutes');
app.use('/api/estudiantes', estudiantesRoutes);

// --- Inicio del Servidor ---
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});