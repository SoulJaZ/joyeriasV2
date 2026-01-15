const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ROLES = require('../utils/roles');

// ADMIN
router.post('/', auth, role([ROLES.ADMIN]), productController.create);
//GET POR ID
router.get('/:id', auth, productController.getById);
router.put('/:id', auth, role([ROLES.ADMIN]), productController.update);
router.delete('/:id', auth, role([ROLES.ADMIN]), productController.remove);

// ADMIN + USER
router.get('/', auth, role([ROLES.ADMIN, ROLES.USER]), productController.getAll);
router.get('/:id', auth, productController.getById);

module.exports = router;