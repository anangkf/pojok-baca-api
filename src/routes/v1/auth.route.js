const express = require('express');
const { authController } = require('../../controller');
const Validator = require('../../middleware/Validator');

const router = express.Router();

router.post('/register', Validator('userRegisterSchema'), authController.registerUser);

module.exports = router;
