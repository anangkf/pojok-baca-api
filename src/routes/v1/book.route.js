const express = require('express');
const { bookController } = require('../../controller/index');
const jwtGuard = require('../../middleware/jwtGuard');
const Validator = require('../../middleware/Validator');
const adminGuard = require('../../middleware/adminGuard');

const router = express.Router();

router.get('/', bookController.getAll);
router.post('/', jwtGuard, adminGuard, Validator('createBookSchema'), bookController.create);
router.get('/:id', bookController.getById);

module.exports = router;
