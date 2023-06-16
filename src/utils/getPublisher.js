const { Publisher } = require('../models/index');

/**
 *
 * @param {String} name publisher's name
 * @return {Promise<Object>} publisher object
 */
const getPublisher = async (name) => {
  const [publisher] = await Publisher.findCreateFind({
    where: { name },
  });

  return publisher;
};

module.exports = getPublisher;
