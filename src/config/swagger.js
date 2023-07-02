const PORT = process.env.PORT || 4001;

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pojok Baca API',
      version: '1.0.0',
      description: 'API services for managing books at Pojok Baca App',
      license: {
        name: 'MIT',
        url: 'https://github.com/anangkf/pojok-baca-api/blob/main/LICENSE',
      },
      contact: {
        name: 'anangkf',
        email: 'anangkhoirulfadli@gmail.com',
      },
    },
    host: `localhost:${PORT}`,
    basePath: '/api/v1',
    servers: [
      {
        name: 'Production server',
        url: 'https://pojok-baca-api-production.up.railway.app/api/v1',
      },
      {
        name: 'Local server',
        url: `http://localhost:${PORT}/api/v1`,
      },
    ],
  },
  apis: ['../routes/*.js', '../routes/v1/*.js', '../routes/v1/*.route.js'],
};

module.exports = { options };
