// class ApiError extends Error {
class ApiError {
  constructor(statusCode, message, stack, isOperational = false) {
    // super(message);
    this.message = message;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    if (isOperational) {
      this.isOperational = isOperational;
    }
  }
}

module.exports = ApiError;
