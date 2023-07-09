const express = require('express');
const jwtGuard = require('../../middleware/jwtGuard');
const userGuard = require('../../middleware/userGuard');
const userBookController = require('../../controller/userbook.controller');
const Validator = require('../../middleware/Validator');
const validateId = require('../../middleware/validateId');

const router = express.Router();

router.get('/', jwtGuard, userGuard, userBookController.getAll);
router.post('/', jwtGuard, userGuard, Validator('addBookToShelfSchema'), userBookController.create);
router.put('/:id', jwtGuard, userGuard, validateId('UserBook'), Validator('updateBookInShelfSchema'), userBookController.update);

module.exports = router;
