const Joi = require('joi');
const CONST = require('../utils/constant');

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  gender: Joi.string().required(),
  password: Joi.string().min(8).required(),
  birthdate: Joi.string().regex(CONST.DATE_REGEXP).message('birthdate should be in YYYY-MM-DD format.'),
  bio: Joi.string(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
};
