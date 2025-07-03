// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Ruta de productos funcionando' });
});

module.exports = router;