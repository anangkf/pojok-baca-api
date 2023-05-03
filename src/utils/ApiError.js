// class ApiError extends Error {
class ApiError {
  constructor(statusCode, message, stack) {
    // super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;
  }
}

module.exports = ApiError;
