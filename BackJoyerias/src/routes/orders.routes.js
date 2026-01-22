const express = require('express');
const router = express.Router();

const controller = require('../controllers/orders.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ROLES = require('../utils/roles');

// =====================
// USER
// =====================
router.post('/', auth, role([ROLES.USER]), controller.create);

router.get('/me', auth, role([ROLES.USER, ROLES.ADMIN]), controller.getMyOrders, controller.getAll);

router.get('/:id/detail', auth, role([ROLES.USER, ROLES.ADMIN]), controller.getOrderDetail);

// =====================
// ADMIN
// =====================
router.get('/', auth, role([ROLES.ADMIN]), controller.getAll);

router.get('/:id', auth, role([ROLES.ADMIN]), controller.getOrderById);

router.put('/:id/status', auth, role([ROLES.ADMIN]), controller.updateStatus);

module.exports = router;
