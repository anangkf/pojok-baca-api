const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { User, Admin } = require('../models');
const ApiError = require('../utils/ApiError');
const { userRegisterSchema } = require('../validator/auth.validator');
const CONST = require('../utils/constant');

/**
 * TESTING
 * TODO: IF REQ.BODY IS UNDEFINED IT SHOULD RETURN HTTP 400 BAD REQUEST
 * TODO: IF VALIDATION FAILED IT SHOULD RETURN PROPPER STATUS CODE AND ERROR MESSAGE
 * TODO: IF USER REGISTERED WITH SAME EMAIL IT SHOULD RETURN HTTP 409 CONFLICT
 */
const registerUser = catchAsync(async (req, res, next) => {
  const { body } = req;
  const passwordHash = await bcrypt.hash(body.password, 9);
  delete body.password;

  const savedUser = await User.create({ ...body, passwordHash });

  return res.status(httpStatus.CREATED).json(savedUser);
});

const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const isPasswordCorrect = !user
    ? null
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return res.status(httpStatus.UNAUTHORIZED).send(new ApiError(httpStatus.UNAUTHORIZED, 'invalid email or password'));
  }

  const userForToken = {
    sub: user.id,
    email,
    role: 'user',
  };

  const accessToken = jwt.sign(userForToken, CONST.JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign(userForToken, CONST.JWT_RT_SECRET, { expiresIn: '7d' });
  return res.json({ accessToken, refreshToken });
});

const registerAdmin = catchAsync(async (req, res) => {
  const { body } = req;
  const passwordHash = await bcrypt.hash(body.password, 9);
  delete body.password;

  const savedAdmin = await Admin.create({ ...body, passwordHash });

  return res.status(httpStatus.CREATED).json(savedAdmin);
});

const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  const isPasswordCorrect = !admin
    ? null
    : await bcrypt.compare(password, admin.passwordHash);

  if (!(admin && isPasswordCorrect)) {
    return res.status(httpStatus.UNAUTHORIZED).send(new ApiError(httpStatus.UNAUTHORIZED, 'invalid email or password'));
  }

  const adminForToken = {
    sub: admin.id,
    email,
    role: 'admin',
  };

  const accessToken = jwt.sign(adminForToken, CONST.JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign(adminForToken, CONST.JWT_RT_SECRET, { expiresIn: '7d' });
  return res.json({ accessToken, refreshToken });
});

module.exports = {
  registerUser,
  userLogin,
  registerAdmin,
  adminLogin,
};
