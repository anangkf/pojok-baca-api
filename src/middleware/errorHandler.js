const httpStatus = require('http-status');
const logger = require('./logger');
const ApiError = require('../utils/ApiError');

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  let { message } = err;
  const {
    name, stack, statusCode, isOperational,
  } = err;

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

  // handle operational api error
  if (isOperational) {
    return res
      .status(statusCode)
      .json(new ApiError(statusCode, message, stack, isOperational));
  }

  logger.error(err);

  const code = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  return res.status(code)
    .json(new ApiError(code, message, stack, isOperational));
  // next(err);
};

module.exports = errorHandler;
