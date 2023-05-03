const httpStatus = require('http-status');
const logger = require('./logger');
const ApiError = require('../utils/ApiError');

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  let { message } = err;
  const { name, stack } = err;

  // joi validation error
  if (name === 'ValidationError') {
    message = err.details.map((error) => error.message);

    return res
      .status(httpStatus.BAD_REQUEST)
      .json(new ApiError(httpStatus.BAD_REQUEST, message, stack));
  }

  // squelize validation error
  if (name === 'SequelizeValidationError') {
    message = err.errors.map((error) => error.message);

    return res
      .status(httpStatus.BAD_REQUEST)
      .json(new ApiError(httpStatus.BAD_REQUEST, message, stack));
  }

  // sequelize constraint error
  if (name === 'SequelizeUniqueConstraintError') {
    message = err.errors.map((error) => error.message);

    return res
      .status(httpStatus.CONFLICT)
      .json(new ApiError(httpStatus.CONFLICT, message, stack));
  }

  logger.error(err);
  // logger.error(message);
  // logger.error(stack);

  next(err);
};

module.exports = errorHandler;
