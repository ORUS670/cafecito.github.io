const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// CRUD completo en 4 líneas
router.post('/', createUser);       // CREATE
router.get('/', getUsers);         // READ
router.put('/:id', updateUser);    // UPDATE
router.delete('/:id', deleteUser); // DELETE

module.exports = router;