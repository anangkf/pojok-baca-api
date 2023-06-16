const { Author } = require('../models/index');

/**
 *
 * @param {String} name author's name
 * @return {Promise<Object>} author object
 */
const getAuthor = async (name) => {
  const [author] = await Author.findCreateFind({
    where: { name },
  });

  return author;
};

module.exports = getAuthor;
