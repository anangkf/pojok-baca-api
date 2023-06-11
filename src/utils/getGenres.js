const httpStatus = require('http-status');
const { Genre } = require('../models/index');
const ApiError = require('./ApiError');

/**
 *
 * @param {Array<String>} genres author's name
 * @return {Promise<Array<Object>>} author object
 */
const getGenres = async (genres) => {
  try {
    const genreArr = genres.map(async (name) => {
      const genreInDB = await Genre.findOne({
        where: { name },
      });

      if (!genreInDB) {
        const newGenre = await Genre.create({ name });
        return newGenre;
      }
      return genreInDB;
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
