const express = require('express');
const router = express.Router();

router.get('/', auth, checkRole(['admin']), roleController.getAll);
