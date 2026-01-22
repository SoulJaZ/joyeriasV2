const express = require('express');
const router = express.Router();

const controller = require('../controllers/payments.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware'); 
const ROLES = require('../utils/roles');

console.log('PAYMENTS ROUTES CARGADAS');

// USER + ADMIN
router.post('/',auth, role([ROLES.USER, ROLES.ADMIN]),controller.create);

// USER
router.get('/me',auth,role([ROLES.USER]),controller.getMyPayments);

// ADMIN
router.get('/',auth,role([ROLES.ADMIN]),controller.getAll);
router.put('/:id/status', auth, role([ROLES.ADMIN]), controller.updateStatus);


module.exports = router;
