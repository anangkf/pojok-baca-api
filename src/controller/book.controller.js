const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  Book, Author, Publisher, BookGenre, Genre,
} = require('../models/index');
const getAuthor = require('../utils/getAuthor');
const getPublisher = require('../utils/getPublisher');
const getGenres = require('../utils/getGenres');
const ApiError = require('../utils/ApiError');
const storageClient = require('../config/storage');
const getFileFromLocal = require('../utils/getFileFromLocal');
const getFileUrl = require('../utils/getFileUrl');

const getAll = catchAsync(async (req, res) => {
  const books = await Book.findAll({
    include: [
      {
        model: Author,
        as: 'author',
        attributes: ['id', 'name'],
      }, {
        model: Publisher,
        as: 'publisher',
        attributes: ['id', 'name'],
      }, {
        model: Genre,
        through: { model: BookGenre, attributes: [] },
        as: 'genres',
        attributes: ['id', 'name'],
      },
    ],
    attributes: {
      exclude: ['authorId', 'publisherId', 'deletedAt'],
    },
  });

  return res.json(books);
});

const create = catchAsync(async (req, res) => {
  const { body } = req;
  const { authorName, publisherName, genreNames } = body;

  const author = await getAuthor(authorName);
  const publisher = await getPublisher(publisherName);

  const { dataValues: savedBook } = await Book.create({
    ...body, authorId: author.id, publisherId: publisher.id,
  });

  const genres = await getGenres(savedBook.id, genreNames);

  delete savedBook.publisherId;
  delete savedBook.authorId;
  delete savedBook.deletedAt;

  return res.json({
    ...savedBook, author, publisher, genres,
  });
});

const getById = catchAsync(async (req, res) => {
  // the validateId middleware return specified id in req.id and book in req.book
  const { id } = req;

  const book = await Book.findByPk(
    id,
    {
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name'],
        }, {
          model: Publisher,
          as: 'publisher',
          attributes: ['id', 'name'],
        }, {
          model: Genre,
          through: { model: BookGenre, attributes: [] },
          as: 'genres',
          attributes: ['id', 'name'],
        },
      ],
      attributes: {
        exclude: ['authorId', 'publisherId', 'deletedAt'],
      },
    },
  );
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

  const author = await getAuthor(authorName);
  const publisher = await getPublisher(publisherName);
  const genres = await getGenres(book.id, genreNames);

  delete body.publisherName;
  delete body.authorName;
  delete body.genreNames;

  const [_, editedBook] = await Book.update({
    ...book, ...body, authorId: author.id, publisherId: publisher.id,
  }, {
    where: { id: book.id },
    returning: true,
  });

  return res.send({
    ...editedBook[0].dataValues, author, publisher, genres,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [deleted] = await Book.destroy({
    where: { id },
    returning: true,
  });
  res.json(deleted);
});

module.exports = {
  getAll,
  create,
  getById,
  uploadThumbnail,
  uploadEbook,
  editBookById,
  deleteById,
};
