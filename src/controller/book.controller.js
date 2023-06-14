const httpStatus = require('http-status');
const Joi = require('joi');
const catchAsync = require('../utils/catchAsync');
const { Book } = require('../models/index');
const getAuthor = require('../utils/getAuthor');
const getPublisher = require('../utils/getPublisher');
const getGenres = require('../utils/getGenres');
const ApiError = require('../utils/ApiError');
const storageClient = require('../config/storage');
const getFileFromLocal = require('../utils/getFileFromLocal');
const getFileUrl = require('../utils/getFileUrl');

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

  delete body.publisherName;
  delete body.authorName;
  delete body.genreNames;

  const savedBook = await Book.create({
    ...body, authorId, publisherId, genreIds,
  });

  return res.json(savedBook);
});

const getById = catchAsync(async (req, res) => {
  // the validateId middleware return specified book in req.book
  const { book } = req;
  return res.json(book);
});

const uploadThumbnail = catchAsync(async (req, res) => {
  const { file } = req;
  if (!file) throw new ApiError(httpStatus.BAD_REQUEST, 'thumbnail of type image/jpeg or image/png is required');

  const { filename, mimetype } = file;
  const image = getFileFromLocal(file);

  const { data, error } = await storageClient
    .from('thumbnail')
    .upload(filename, image, {
      contentType: mimetype,
    });

  if (error) throw new ApiError(Number(error.statusCode), error.message);

  const url = getFileUrl({ bucket: 'thumbnail', filename });
  return res.status(httpStatus.CREATED).json({ url });
});

const uploadEbook = catchAsync(async (req, res) => {
  const { file } = req;
  if (!file) throw new ApiError(httpStatus.BAD_REQUEST, 'ebook of type application/pdf is required');

  const { filename, mimetype } = file;
  const ebook = getFileFromLocal(file);

  const { data, error } = await storageClient
    .from('ebook')
    .upload(filename, ebook, {
      contentType: mimetype,
    });

  if (error) throw new ApiError(Number(error.statusCode), error.message);

  const url = getFileUrl({ bucket: 'ebook', filename });
  return res.status(httpStatus.CREATED).json({ url });
});

const editBookById = catchAsync(async (req, res) => {
  const { book, body } = req;
  const { authorName, publisherName, genreNames } = body;

  const { id: authorId } = await getAuthor(authorName);
  const { id: publisherId } = await getPublisher(publisherName);
  const genres = await getGenres(genreNames);
  const genreIds = genres.map((genre) => genre.id);

  delete body.publisherName;
  delete body.authorName;
  delete body.genreNames;

  const [_, editedBook] = await Book.update({
    ...book, ...body, authorId, publisherId, genreIds,
  }, {
    where: { id: book.id },
    returning: true,
  });

  return res.send(editedBook[0]);
});

module.exports = {
  getAll,
  create,
  getById,
  uploadThumbnail,
  uploadEbook,
  editBookById,
};
