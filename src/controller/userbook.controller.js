const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  UserBook, Book, Author, Publisher, Genre, BookGenre,
} = require('../models/index');
const ApiError = require('../utils/ApiError');

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

const getById = catchAsync(async (req, res) => {
  const { params } = req;
  const userBook = await UserBook.findOne({
    where: {
      id: params.id,
    },
    ...populateUserBook,
  });

  res.json(userBook);
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

const updateById = catchAsync(async (req, res) => {
  const { body, params, user } = req;
  let { userbook } = req;
  userbook = await userbook.reload(populateUserBook);

  // only allow related user to edit the userbook
  if (user.id !== userbook.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only related user can edit his books in shelf');
  }

  // prevent pagesRead exceeding actual book's pages count
  if (body.pagesRead > userbook.book.pages) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'pagesRead count cannot be greater than book pages');
  }

  // if pagesRead === book.pages set completed to true and finishedAt to timestamp now
  // this way can prevent the app rolling back completed status to false if pagesRead < book.pages
  if (body.pagesRead === userbook.book.pages) {
    body.completed = true;
    body.finishedAt = new Date().toISOString();
  }

  const updatedUserBookData = {
    ...userbook.dataValues,
    ...body,
  };
  const [_, [updatedUserBook]] = await UserBook.update(updatedUserBookData, {
    where: {
      id: params.id,
    },
    returning: true,
  });

  return res.json(updatedUserBook);
});

const deleteById = catchAsync(async (req, res) => {
  const { userbook, user } = req;

  // only allow related user to delete the userbook
  if (user.id !== userbook.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only related user can delete his books in shelf');
  }

  const [deletedUserBook] = await UserBook.destroy({
    where: {
      id: userbook.id,
    },
    returning: true,
  });

  return res.json(deletedUserBook);
});

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
