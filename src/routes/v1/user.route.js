const express = require('express');
const { userController } = require('../../controller/index');
const userBookRouter = require('./userbook.route');

const router = express.Router();

router.get('/', userController.getAll);
// userBooks route
router.use('/book', userBookRouter);

module.exports = router;
