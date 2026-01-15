const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const categoryController = require('../controllers/category.controller');

// USER y ADMIN
router.get('/', auth, categoryController.getAll);
router.get('/:id', auth, categoryController.getById);
router.post('/', auth, categoryController.create);

// SOLO ADMIN
router.post('/', auth, checkRole(['admin']), categoryController.create);
router.put('/:id', auth, checkRole(['admin']), categoryController.update);
router.delete('/:id', auth, checkRole(['admin']), categoryController.remove);

module.exports = router;
