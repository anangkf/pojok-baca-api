const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Book } = require('../models/index');
const getAuthor = require('../utils/getAuthor');
const getPublisher = require('../utils/getPublisher');
const getGenres = require('../utils/getGenres');
const ApiError = require('../utils/ApiError');
const storageClient = require('../config/storage');
const getImageFromLocal = require('../utils/getImageFromLocal');
const getImageUrl = require('../utils/getImageUrl');

const getAll = catchAsync(async (req, res) => {
  const books = await Book.findAll();

  return res.json(books);
});

const create = catchAsync(async (req, res) => {
  const { body } = req;
  const { authorName, publisherName, genreNames } = body;

  const { id: authorId } = await getAuthor(authorName);
  const { id: publisherId } = await getPublisher(publisherName);
  const genres = await getGenres(genreNames);
  const genreIds = genres.map(({ id }) => id);

  delete body.publisher;
  delete body.author;
  delete body.genreNames;

  const savedBook = await Book.create({
    ...body, authorId, publisherId, genreIds,
  });

  return res.json(savedBook);
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({
    where: { id },
  });

  if (!book) return res.status(httpStatus.NOT_FOUND).send(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
  return res.json(book);
});

const uploadThumbnail = catchAsync(async (req, res) => {
  const { file } = req;
  if (!file) throw new ApiError(httpStatus.BAD_REQUEST, 'thumbnail of type image/jpeg or image/png is required');

  const { filename, mimetype } = file;
  const image = getImageFromLocal(file);

  const { data, error } = await storageClient
    .from('thumbnail')
    .upload(filename, image, {
      contentType: mimetype,
    });

  if (error) throw new ApiError(Number(error.statusCode), error.message);

  const url = getImageUrl({ bucket: 'thumbnail', filename });
  return res.status(httpStatus.CREATED).json({ url });
});

module.exports = {
  getAll,
  create,
  getById,
  uploadThumbnail,
};
