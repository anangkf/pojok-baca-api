const { Publisher } = require('../models/index');

/**
 *
 * @param {String} name publisher's name
 * @return {Promise<Object>} publisher object
 */
const getPublisher = async (name) => {
  const publisherInDB = await Publisher.findOne({
    where: { name },
  });

  if (!publisherInDB) {
    return Publisher.create({ name });
  }
  return publisherInDB;
};

module.exports = getPublisher;
