const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// eslint-disable-next-line consistent-return
const adminGuard = (req, res, next) => {
  try {
    // get req.user values, save as admin variable
    const { user: admin } = req;
    // validate if req.user should be an admin entity
    // gender property indicates that req.user is an user entity
    // if (Object.prototype.hasOwnProperty.call(admin, 'gender')) {
    if (admin.gender) {
      return res
        .status(httpStatus.FORBIDDEN)
        .send(new ApiError(httpStatus.FORBIDDEN, 'only admin can manipulate this data', null, true));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminGuard;
