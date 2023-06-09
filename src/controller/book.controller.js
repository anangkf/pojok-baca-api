const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => res.send());
const create = catchAsync(async (req, res) => {
  // const { body } = req;
  console.log('req.user');
  return res.json(req.user);
});

module.exports = {
  getAll,
  create,
};
