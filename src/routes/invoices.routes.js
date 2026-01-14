const express = require('express');
const router = express.Router();

const controller = require('../controllers/invoices.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ROLES = require('../utils/roles');

// USER
router.get('/me', auth, role([ROLES.USER]), controller.getMyInvoices);

// ADMIN
router.get('/', auth, role([ROLES.ADMIN]), controller.getAll);

router.get('/:id/pdf',auth,role([ROLES.ADMIN, ROLES.ADMIN]),controller.downloadInvoice);

module.exports = router;
