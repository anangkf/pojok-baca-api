const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  logger.error(err.stack);

  next(err);
};

module.exports = errorHandler;
