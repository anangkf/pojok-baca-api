require('dotenv').config();

const {
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DB_NAME,
  PG_SCHEMA,
  DB_DIALECT,
} = process.env;

const DATE_REGEXP = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/;

module.exports = {
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DB_NAME,
  PG_SCHEMA,
  DB_DIALECT,
  DATE_REGEXP,
};
