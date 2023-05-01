require('dotenv').config();

const {
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DB_NAME,
  PG_SCHEMA,
  DB_DIALECT,
} = process.env;

module.exports = {
  development: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB_NAME,
    host: PG_HOST,
    schema: PG_SCHEMA,
    dialect: 'postgres',
  },
  test: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB_NAME,
    host: PG_HOST,
    schema: PG_SCHEMA,
    dialect: 'postgres',
  },
  production: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB_NAME,
    host: PG_HOST,
    schema: PG_SCHEMA,
    dialect: 'postgres',
  },
};
