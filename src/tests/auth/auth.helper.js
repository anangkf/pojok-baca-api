const { User } = require('../../models/index');

const usersInDB = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    console.log('error getting users in db', error);
    throw new Error(error.message);
  }
};

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
  userCredentials: {
    email: 'test@mail.com',
    password: 'test1234',
  },
};
