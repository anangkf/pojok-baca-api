const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { userRegisterSchema } = require('../validator/auth.validator');

/**
 * TESTING
 * TODO: IF REQ.BODY IS UNDEFINED IT SHOULD RETURN HTTP 400 BAD REQUEST
 * TODO: IF VALIDATION FAILED IT SHOULD RETURN PROPPER STATUS CODE AND ERROR MESSAGE
 * TODO: IF USER REGISTERED WITH SAME EMAIL IT SHOULD RETURN HTTP 409 CONFLICT
 */
const registerUser = catchAsync(async (req, res, next) => {
  const { body } = req;
  if (!body.password) return res.status(httpStatus.BAD_REQUEST).send(new ApiError(httpStatus.BAD_REQUEST, 'Password cannot be null'));
  userRegisterSchema.validate(body);
  const passwordHash = bcrypt.hashSync(body.password, 9);
  delete body.password;

  const savedUser = await User.create({ ...body, passwordHash });

  return res.status(httpStatus.CREATED).json(savedUser);
});

module.exports = {
  registerUser,
};
