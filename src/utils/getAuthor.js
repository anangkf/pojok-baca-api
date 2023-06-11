const { Author } = require('../models/index');

/**
 *
 * @param {String} name author's name
 * @return {Promise<Object>} author object
 */
const getAuthor = async (name) => {
  const authorInDB = await Author.findOne({
    where: { name },
  });

  if (!authorInDB) {
    return Author.create({ name });
  }
  return authorInDB;
};

module.exports = getAuthor;
