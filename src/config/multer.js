const multer = require('multer');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const DIR = './public/tmp/uploads';

const storage = multer.diskStorage({
  destination: DIR,
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.toLowerCase().replaceAll(' ', '-')}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const url = req.url.replaceAll('/', '');
  const unsupportedErr = new ApiError(httpStatus.BAD_REQUEST, `Unsupported file format: ${file.mimetype}`);
  console.log('upload middleware triggered on endpoint:', url);

  switch (url) {
  case 'thumbnail':
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
      break;
    }
    cb(unsupportedErr, false);
    break;
  case 'ebook':
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
      break;
    }
    cb(unsupportedErr, false);
    break;
  default:
    cb(unsupportedErr, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
