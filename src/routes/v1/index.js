const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const bookRoute = require('./book.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/book', bookRoute);

module.exports = router;
