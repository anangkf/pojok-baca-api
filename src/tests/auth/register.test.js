const bcrypt = require('bcrypt');
const { User } = require('../../models/index');
const api = require('../helpers/apis.helper');
const helper = require('./auth.helper');

beforeEach(async () => {
  try {
    await User.destroy({
      truncate: true
    });
  
    const promiseArray = helper.initialUsers.map(
      async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 9);
        delete user.password;
        return User.create({ ...user, passwordHash });
      }
    )
    await Promise.all(promiseArray);
  } catch (error) {
    console.log(error)
  }
}, 20000)

test('should ', () => {
  
})
