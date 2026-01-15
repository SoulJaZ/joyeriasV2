const express = require('express');
const router = express.Router();

// ADMIN
router.get('/', auth, checkRole(['admin']), userController.getAll);
router.get('/:id', auth, checkRole(['admin']), userController.getById);
router.put('/:id', auth, checkRole(['admin']), userController.update);
router.delete('/:id', auth, checkRole(['admin']), userController.remove);
