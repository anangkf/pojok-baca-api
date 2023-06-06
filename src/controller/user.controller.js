const catchAsync = require("../utils/catchAsync")
const { User } = require('../models/index');

const getAll = catchAsync( async(req, res) => {
  const users = await User.findAll();

  return res.json(users)
})

module.exports = {
  getAll
}