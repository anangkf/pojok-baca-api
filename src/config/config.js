const CONST = require('../utils/constant');

const {
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DB_NAME,
  PG_SCHEMA,
  DB_DIALECT,
} = CONST;

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
