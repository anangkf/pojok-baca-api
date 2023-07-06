const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// eslint-disable-next-line consistent-return
const userGuard = (req, res, next) => {
  try {
    // get user from req.user
    const { user } = req;
    // validate if req.user should be user entity, not admin
    // gender property indicates that req.user is an user entity
    if (!user.gender) {
      return res
        .status(httpStatus.FORBIDDEN)
        .send(new ApiError(httpStatus.FORBIDDEN, 'only user can access and manipulate this data', null, true));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userGuard;
