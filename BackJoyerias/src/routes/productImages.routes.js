const express = require('express');
const router = express.Router();

// ADMIN
router.post('/', auth, checkRole(['admin']), imageController.create);
router.get('/:product_id', imageController.getByProduct);
router.delete('/:id', auth, checkRole(['admin']), imageController.remove);
