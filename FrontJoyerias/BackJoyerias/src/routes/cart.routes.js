const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, controller.getCart);
router.post('/items', auth, controller.addItem);

module.exports = router;
