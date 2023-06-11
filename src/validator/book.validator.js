const Joi = require('joi');

const currentYear = new Date().getFullYear();

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  authorName: Joi.string().required(),
  publisherName: Joi.string().required(),
  published: Joi.number().max(currentYear).required(),
  thumbnail: Joi.string().uri().required(),
  ebookUrl: Joi.string().uri().required(),
  genreNames: Joi.array().items(Joi.string()).required(),
  pages: Joi.number().positive().required(),
  rating: Joi.number().max(5),
});

module.exports = {
  createBookSchema,
};
