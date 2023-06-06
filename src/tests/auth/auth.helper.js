const { User, Admin } = require('../../models/index');

const usersInDB = async () => User.findAll();
const adminsInDB = async () => Admin.findAll();

module.exports = {
  usersInDB,
  initialUsers: [
    {
      email: 'test@mail.com',
      name: 'tester',
      gender: 'male',
      password: 'test1234',
    },
    {
      email: 'anangkf@mail.com',
      name: 'anangkf',
      gender: 'male',
      password: 'anang1234',
    },
  ],
  validUserData: {
    email: 'test@gmail.com',
    name: 'tester',
    gender: 'female',
    password: 'test1234',
  },
  userDataWithInvalidEmail: {
    email: 'test@mail',
    name: 'tester',
    gender: 'female',
    password: 'test1234',
  },
  userDataWithInvalidEmailResponse: {
    message: [
      '"email" must be a valid email',
    ],
    statusCode: 400,
    stack: 'ValidationError: "email" must be a valid email',
  },
  userDataWithInvalidName: {
    name: ['Tester'],
    email: 'test@mail.com',
    password: 'test1234',
    gender: 'male',
  },
  userDataWithInvalidNameResponse: {
    message: [
      '"name" must be a string',
    ],
    statusCode: 400,
    stack: 'ValidationError: "name" must be a string',
  },
  userDataWithInvalidGender: {
    name: 'Tester',
    email: 'test@gmail.com',
    password: 'test1234',
    gender: ['male'],
  },
  userDataWithInvalidGenderResponse: {
    message: [
      '"gender" must be a string',
    ],
    statusCode: 400,
    stack: 'ValidationError: "gender" must be a string',
  },
  userDataWithInvalidPassword: {
    name: 'Tester',
    email: 'test@gmail.com',
    password: ['test1234'],
    gender: 'male',
  },
  userDataWithInvalidPasswordResponse: {
    message: [
      '"password" must be a string',
    ],
    statusCode: 400,
    stack: 'ValidationError: "password" must be a string',
  },
  userDataWithRegisteredEmail: {
    email: 'anangkf@mail.com',
    name: 'anangkf',
    gender: 'male',
    password: 'anang1234',
  },
  validUserCredentials: {
    email: 'test@mail.com',
    password: 'test1234',
  },
  userCredentialsWithInvalidEmail: {
    email: 'test@mail',
    password: 'test1234',
  },
  userCredentialsWithInvalidEmailResponse: {
    message: [
      '"email" must be a valid email',
    ],
    statusCode: 400,
    stack: 'ValidationError: "email" must be a valid email',
  },
  userCredentialsWithInvalidPassword: {
    email: 'test@mail.com',
    password: 'test123',
  },
  userCredentialsWithInvalidPasswordResponse: {
    message: [
      '"password" length must be at least 8 characters long',
    ],
    statusCode: 400,
    stack: 'ValidationError: "password" length must be at least 8 characters long',
  },
  invalidUserCredentials: {
    email: 'test@mail.com',
    password: 'test12345',
  },
  invalidUserCredentialsResponse: {
    message: 'invalid email or password',
    statusCode: 401,
  },
  adminsInDB,
  initialAdmin: [
    {
      email: 'admin@gmail.com',
      password: 'admin123',
    },
  ],
  validAdminData: {
    email: 'superadmin@gmail.com',
    password: 'superadmin123',
  },
  adminWithInvalidEmail: {
    email: 'superadmin.com',
    password: 'superadmin123',
  },
  adminWithInvalidEmailResponse: {
    message: [
      '"email" must be a valid email',
    ],
    statusCode: 400,
    stack: 'ValidationError: "email" must be a valid email',
  },
  adminWithInvalidPassword: {
    email: 'superadmin@gmail.com',
    password: ['superadmin123'],
  },
  adminWithInvalidPasswordResponse: {
    message: [
      '"password" must be a string',
    ],
    statusCode: 400,
    stack: 'ValidationError: "password" must be a string',
  },
  adminWithEmailRegistered: {
    email: 'admin@gmail.com',
    password: 'admin123',
  },
  adminWithEmailRegisteredResponse: {
    message: [
      'email must be unique',
    ],
    statusCode: 409,
  },
};
