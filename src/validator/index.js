const authValidator = require('./auth.validator');
const bookValidator = require('./book.validator');

module.exports = {
  ...authValidator,
  ...bookValidator,
};
