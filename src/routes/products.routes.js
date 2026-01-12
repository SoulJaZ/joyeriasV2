const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ROLES = require('../utils/roles');

router.post(
    '/',
    auth,
    role([ROLES.ADMIN]),
    (req, res) => {
        res.json({ message: 'Producto creado (solo ADMIN)' });
    }
);

router.get(
    '/',
    auth,
    role([ROLES.ADMIN, ROLES.USER]),
    (req, res) => {
        res.json({ message: 'Listado de productos' });
    }
);

module.exports = router;