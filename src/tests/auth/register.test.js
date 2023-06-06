const bcrypt = require('bcrypt');
const { User, Admin } = require('../../models/index');
const api = require('../helpers/apis.helper');
const helper = require('./auth.helper');

beforeEach(async () => {
  try {
    await User.destroy({
      truncate: true,
    });
    await Admin.destroy({
      truncate: true,
    });

    const userPromiseArray = helper.initialUsers.map(
      async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 9);
        const { password, ...userWithoutPassword } = user;
        return User.create({ ...userWithoutPassword, passwordHash });
      },
    );

    const adminPromiseArray = helper.initialAdmin.map(
      async (admin) => {
        const passwordHash = await bcrypt.hash(admin.password, 9);
        const { password, ...adminWithoutPassword } = admin;
        return Admin.create({ ...adminWithoutPassword, passwordHash });
      },
    );

    await Promise.all([...userPromiseArray, ...adminPromiseArray]);
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

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('should return 409 conflict if email already registered', async () => {
    await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithRegisteredEmail)
      .expect(409);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('should return propper status code and error message if email validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidEmail);

    expect(response.body).toEqual(helper.userDataWithInvalidEmailResponse);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('should return propper status code and error message if name validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidName);

    expect(response.body).toEqual(helper.userDataWithInvalidNameResponse);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('should return propper status code and error message if gender validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidGender);

    expect(response.body).toEqual(helper.userDataWithInvalidGenderResponse);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('should return propper status code and error message if password validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/register')
      .send(helper.userDataWithInvalidPassword);

    expect(response.body).toEqual(helper.userDataWithInvalidPasswordResponse);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });
});

describe('register admin', () => {
  test('should add a new admin if all validation pass', async () => {
    await api
      .post('/api/v1/auth/admin/register')
      .send(helper.validAdminData)
      .expect(201);

    const adminsAtEnd = await helper.adminsInDB();
    expect(adminsAtEnd).toHaveLength(helper.initialAdmin.length + 1);
  });

  test('should return 409 conflict if email already registered', async () => {
    const response = await api
      .post('/api/v1/auth/admin/register')
      .send(helper.adminWithEmailRegistered)
      .expect(409);

    expect(response.body).toMatchObject(helper.adminWithEmailRegisteredResponse);

    const adminsAtEnd = await helper.adminsInDB();
    expect(adminsAtEnd).toHaveLength(helper.initialAdmin.length);
  });

  test('should return 400 bad request if request body is undefined', async () => {
    await api
      .post('/api/v1/auth/admin/register')
      .expect(400);

    const adminsAtEnd = await helper.adminsInDB();
    expect(adminsAtEnd).toHaveLength(helper.initialAdmin.length);
  });

  test('should return propper status code and error message if email validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/admin/register')
      .send(helper.adminWithInvalidEmail)
      .expect(400);

    expect(response.body).toEqual(helper.adminWithInvalidEmailResponse);

    const adminsAtEnd = await helper.adminsInDB();
    expect(adminsAtEnd).toHaveLength(helper.initialAdmin.length);
  });

  test('should return propper status code and error message if password validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/admin/register')
      .send(helper.adminWithInvalidPassword)
      .expect(400);

    expect(response.body).toEqual(helper.adminWithInvalidPasswordResponse);

    const adminsAtEnd = await helper.adminsInDB();
    expect(adminsAtEnd).toHaveLength(helper.initialAdmin.length);
  });
});
