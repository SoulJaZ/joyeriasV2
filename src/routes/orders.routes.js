const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders.controller');
const auth = require('../middlewares/auth.middleware')


router.post('/', auth, controller.create);

module.exports = router;