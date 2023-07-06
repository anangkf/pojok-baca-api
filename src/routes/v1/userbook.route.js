const express = require('express');
const jwtGuard = require('../../middleware/jwtGuard');
const userGuard = require('../../middleware/userGuard');
const userBookController = require('../../controller/userbook.controller');

const router = express.Router();

router.get('/', jwtGuard, userGuard, userBookController.getAll);

module.exports = router;
