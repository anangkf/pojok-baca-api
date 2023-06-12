const catchAsync = require('../utils/catchAsync');
const { Book, Author } = require('../models/index');
const getAuthor = require('../utils/getAuthor');
const getPublisher = require('../utils/getPublisher');
const getGenres = require('../utils/getGenres');

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

module.exports = {
  getAll,
  create,
};
