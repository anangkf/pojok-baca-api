const express = require('express');
const jwtGuard = require('../../middleware/jwtGuard');
const userGuard = require('../../middleware/userGuard');
const userBookController = require('../../controller/userbook.controller');
const Validator = require('../../middleware/Validator');

const router = express.Router();

router.get('/', jwtGuard, userGuard, userBookController.getAll);
router.post('/', jwtGuard, userGuard, Validator('addBookToShelfSchema'), userBookController.create);

module.exports = router;
