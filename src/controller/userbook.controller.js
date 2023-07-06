const catchAsync = require('../utils/catchAsync');
const {
  UserBook, Book, Author, Publisher, Genre, BookGenre,
} = require('../models/index');

const populateUserBook = {
  include: [
    {
      model: Book,
      as: 'book',
      attributes: {
        exclude: ['authorId', 'publisherId', 'deletedAt'],
      },
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
    },
  ],
  attributes: {
    exclude: ['userId', 'bookId', 'createdAt', 'updatedAt', 'deletedAt'],
  },
};

const getAll = catchAsync(async (req, res) => {
  const { user } = req;
  const userBooks = await UserBook.findAll({
    where: {
      userId: user.id,
    },
    ...populateUserBook,
  });

  res.json(userBooks);
});

const create = catchAsync(async (req, res) => {
  const { user, body } = req;
  const [userBook, newEntry] = await UserBook.findCreateFind({
    where: {
      userId: user.id,
      bookId: body.bookId,
    },
    ...populateUserBook,
  });

  if (newEntry) {
    await userBook.reload(populateUserBook);
    return res.json(userBook);
  }

  return res.json(userBook);
});

module.exports = {
  getAll,
  create,
};
