const app = require('./app');
const { sequelize } = require('./models/index');

const PORT = process.env.PORT || 4001;

// connect to database
const connectDb = async () => {
  console.log('Checking database connection...');

  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
  } catch (error) {
    console.log('Database connection failed.', error);
    process.exit(1);
  }
};

(async () => {
  await connectDb();

  console.log(`Attempting to run server on port ${PORT}`);
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
})();
