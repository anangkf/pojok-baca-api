const catchAsync = require('../utils/catchAsync');
const {
  UserBook, Book, Author, Publisher, Genre, BookGenre,
} = require('../models/index');

const getAll = catchAsync(async (req, res) => {
  const { user } = req;
  const userBooks = await UserBook.findAll({
    where: {
      userId: user.id,
    },
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
    attributes: ['id', 'pagesRead', 'completed', 'startedAt', 'finishedAt'],
  });

  res.json(userBooks);
});

module.exports = {
  getAll,
};
