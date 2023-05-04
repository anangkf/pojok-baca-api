const express = require('express');
const { authController } = require('../../controller');
const Validator = require('../../middleware/Validator');

const router = express.Router();

router.post('/user/register', Validator('userRegisterSchema'), authController.registerUser);
router.post('/user/login', Validator('userLoginSchema'), authController.userLogin);
router.post('/admin/register', Validator('adminAuthSchema'), authController.registerAdmin);

module.exports = router;
