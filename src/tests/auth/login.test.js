const api = require('../helpers/apis.helper');
const helper = require('./auth.helper');

describe('login user', () => {
  test('should return accessToken and refreshToken if given credentials are valid', async () => {
    const response = await api
      .post('/api/v1/auth/user/login')
      .send(helper.validUserCredentials)
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  test('should return propper status code and error message if email validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/login')
      .send(helper.userCredentialsWithInvalidEmail)
      .expect(400);

    expect(response.body).toEqual(helper.userCredentialsWithInvalidEmailResponse);
  });

  test('should return propper status code and error message if password validation failed', async () => {
    const response = await api
      .post('/api/v1/auth/user/login')
      .send(helper.userCredentialsWithInvalidPassword)
      .expect(400);

    expect(response.body).toEqual(helper.userCredentialsWithInvalidPasswordResponse);
  });

  test('should return propper status code and error message if given credentials are invalid', async () => {
    const response = await api
      .post('/api/v1/auth/user/login')
      .send(helper.invalidUserCredentials)
      .expect(401);

    expect(response.body).toEqual(helper.invalidUserCredentialsResponse);
  });
});
