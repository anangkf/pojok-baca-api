const Joi = require('joi');
const httpStatus = require('http-status');
const model = require('../models/index');
const ApiError = require('../utils/ApiError');

const validateId = (entity) => async (req, res, next) => {
  if (!Object.prototype.hasOwnProperty.call(model, entity)) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `'${entity}' model doesnt exist`);
  }

  try {
    const { id } = req.params;
    // validate req.params.id is valid UUID
    await Joi
      .string()
      .uuid()
      .messages({
        'string.guid': 'Invalid UUID',
      })
      .validateAsync(id);
    req.id = id;
    const row = await model[entity].findByPk(id);

    if (!row) throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    req[entity.toLowerCase()] = row;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateId;
