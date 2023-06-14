const express = require('express');
const { bookController } = require('../../controller/index');
const jwtGuard = require('../../middleware/jwtGuard');
const Validator = require('../../middleware/Validator');
const adminGuard = require('../../middleware/adminGuard');
const upload = require('../../config/multer');

const router = express.Router();

router.get('/', bookController.getAll);
router.post('/', jwtGuard, adminGuard, Validator('createBookSchema'), bookController.create);
router.get('/:id', bookController.getById);
router.post('/thumbnail', jwtGuard, adminGuard, upload.single('thumbnail'), bookController.uploadThumbnail);
router.post('/ebook', jwtGuard, adminGuard, upload.single('ebook'), bookController.uploadEbook);

module.exports = router;
