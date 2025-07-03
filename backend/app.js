require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB ✅'))
  .catch(err => console.error('Error de conexión a MongoDB ❌:', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT} 🚀`);
});