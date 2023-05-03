const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const validators = require('../validator/index');

module.exports = (schema) => {
  if (!Object.prototype.hasOwnProperty.call(validators, schema)) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `'${schema}' validator doesnt exist`);
  }

  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    try {
      const validated = await validators[schema].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      next(error);
    }
  };
};
