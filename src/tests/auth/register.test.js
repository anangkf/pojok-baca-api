const bcrypt = require('bcrypt');
const { User } = require('../../models/index');
const api = require('../helpers/apis.helper');
const helper = require('./auth.helper');

beforeEach(async () => {
  try {
    await User.destroy({
      truncate: true,
    });

    const userPromiseArray = helper.initialUsers.map(
      async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 9);
        // eslint-disable-next-line no-param-reassign
        const { password, ...userWithoutPassword } = user;
        return User.create({ ...userWithoutPassword, passwordHash });
      },
    );
    await Promise.all(userPromiseArray);
  } catch (error) {
    console.log(error);
  }
}, 20000);

describe('register user', () => {
  test('should add a new user if all validation pass', async () => {
    await api
      .post('/api/v1/auth/user/register')
      .send(helper.validUserData)
      .expect(201);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
  });

  test('should return 400 bad request if request body is undefined', async () => {
    await api
      .post('/api/v1/auth/user/register')
      .expect(400);
  });

  test('should return 409 conflict if email already registered', async () => {
    await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithRegisteredEmail)
      .expect(409);
  });

  test('should return propper status code and error message if email validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidEmail);

    expect(response.body).toEqual(helper.userDataWithInvalidEmailResponse);
  });

  test('should return propper status code and error message if name validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidName);

    expect(response.body).toEqual(helper.userDataWithInvalidNameResponse);
  });

  test('should return propper status code and error message if gender validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidGender);

    expect(response.body).toEqual(helper.userDataWithInvalidGenderResponse);
  });

  test('should return propper status code and error message if password validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidPassword);

    expect(response.body).toEqual(helper.userDataWithInvalidPasswordResponse);
  });
});
