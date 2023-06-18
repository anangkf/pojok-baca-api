const httpStatus = require('http-status');
const { Genre, BookGenre } = require('../models/index');
const ApiError = require('./ApiError');

/**
 *
 * @param {Array<String>} genres author's name
 * @param {String} bookId book id
 * @return {Promise<Array<Object>>} author object
 */
const getGenres = async (bookId, genres) => {
  try {
    const genreArr = genres.map(async (name) => {
      const [genre] = await Genre.findCreateFind({
        where: { name },
      });
      // create relation N:N between Book and Genre through BookGenres table
      await BookGenre.findCreateFind({
        where: { bookId, genreId: genre.id },
        defaults: { bookId, genreId: genre.id },
      });

      return genre;
    });
    return Promise.all(genreArr);
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      null,
      true,
    );
  }
};

module.exports = getGenres;
