const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders.controller');
const auth = require('../middlewares/auth.middleware')


router.post('/', auth, controller.create);
router.get('/', auth, role([ROLES.ADMIN, ROLES.USER]), controller.getAll);



module.exports = router;