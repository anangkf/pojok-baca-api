const express = require('express');
const { bookController } = require('../../controller/index');
const jwtGuard = require('../../middleware/jwtGuard');
// const Validator = require('../../middleware/Validator');

const router = express.Router();

router.get('/', bookController.getAll);
router.post('/', jwtGuard, bookController.create);

module.exports = router;
