const express = require('express');
const { authController } = require('../../controller');
const Validator = require('../../middleware/Validator');
const jwtGuard = require('../../middleware/jwtGuard');

const router = express.Router();

router.get('/me', jwtGuard, authController.getInfo);
router.post('/user/register', Validator('userRegisterSchema'), authController.registerUser);
router.post('/user/login', Validator('userLoginSchema'), authController.userLogin);
router.post('/admin/register', Validator('adminAuthSchema'), authController.registerAdmin);
router.post('/admin/login', Validator('adminAuthSchema'), authController.adminLogin);

module.exports = router;
