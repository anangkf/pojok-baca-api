const httpStatus = require('http-status');

const notFoundException = (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({ error: 'unknown endpoint' });
};

module.exports = notFoundException;
